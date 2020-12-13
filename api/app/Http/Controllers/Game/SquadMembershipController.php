<?php

namespace App\Http\Controllers\Game;

use App\Models\Game;
use App\Models\User;
use App\Http\Message;
use App\Models\Squad;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class SquadMembershipController extends Controller
{
    /**
     * Return game squads with memberships
     *
     * @return \Illuminate\Http\Response
     */
    public function index(int $id)
    {
        return Game::firstOrFail()->squads()->with('members');
    }

    /**
     * Add user to game squad
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'squad_id' => 'integer|required',
            'user_id' => 'integer|required'
        ]);

        $squad = Squad::firstOrFail($request->squad_id);
        $user = User::firstOrFail($request->user_id);

        if ($squad->members()->count() == $squad->slots) {
            return Message::error(406, "You can't join a full squad");
        }

        $squad->members()->attach($user->id);
        return Message::ok('Squad joined');
    }

    /**
     * Get squad memberships
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Squad::firstOrFail($id)->members()->get();
    }

    /**
     * Move member from a squad to antoher within the same game
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'squad_id' => 'integer|required',
            'user_id' => 'integer|required'
        ]);

        $currentSquad = Squad::firstOrFail($id);
        $newSquad = Squad::firstOrFail($request->squad_id);
        $user = User::firstOrFail($request->user_id);

        if ($currentSquad->id !== $newSquad->id) {
            return Message::error(406, 'Users can switch memberships only within the same game');
        }

        if ($newSquad->members()->count() == $newSquad->slots) {
            return Message::error(406, 'User cannot move to a new squad');
        }

        DB::beginTransaction();

        $currentSquad->members()->detach($user->id);
        $newSquad->members()->attach($user->id);

        DB::commit();

        return Message::ok('Squad changed', [
            $currentSquad->with('members')->get(),
            $newSquad->with('members')->get()
        ]);
    }

    /**
     * Remove user from squad and effectively from game
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'squad_id' => 'integer|required',
            'user_id' => 'integer|required'
        ]);

        $squad = Squad::firstOrFail($request->squad_id);
        $user = User::firstOrFail($request->user_id);

        $squad->members()->detach($user->id);
        return Message::ok('Squad and game left');
    }
}
