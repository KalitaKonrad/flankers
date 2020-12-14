<?php

namespace App\Http\Controllers\Game;

use App\Models\Game;
use App\Models\User;
use App\Http\Message;
use App\Models\Squad;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class SquadMembershipController extends Controller
{
    /**
     * Instantiate the controller
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Return game squads with memberships
     *
     * @group Game management
     * @urlParam squad_id int required Squad id
     *
     * @return \Illuminate\Http\Response
     */
    public function index(int $squad_id)
    {
        return Game::firstOrFail($squad_id)->squads()->with('members');
    }

    /**
     * Add user to game squad
     *
     * This request will fail if:
     * - user will try to join to a full squad (406)
     * - user has already joined the squad (406)
     *
     * @group Game management
     * @bodyParam squad_id int required Squad id
     * @bodyParam user_id int required User id to add to squad
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

        $squad = Squad::findOrFail($request->squad_id);
        $user = User::findOrFail($request->user_id);

        if (intval($squad->members()->count()) == $squad->slots) {
            return Message::error(406, "You can't join a full squad");
        }

        if ($squad->members()->find($user->id)) {
            return Message::error(406, "You already joined this match");
        }

        $squad->members()->attach($user->id);
        return Message::ok('Squad joined');
    }

    /**
     * Get squad memberships
     *
     * @group Game management
     * @urlParam squad_id int required Squad id
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $squad_id)
    {
        return Squad::firstOrFail($squad_id)->members()->get();
    }

    /**
     * Move member from a squad to antoher within the same game
     *
     *  This request will fail if:
     * - request user tries to move someone other than himself, while not being game owner (403)
     * - user will try to move membership between squads from different games (406)
     * - user will try to move to a full squad (406)
     *
     * @group Game management
     * @urlParam squad_id int required Squad id
     * @bodyParam new_squad_id int required Squad id to move user to
     * @bodyParam user_id int required User id to move
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $squad_id)
    {
        $request->validate([
            'new_squad_id' => 'integer|required',
            'user_id' => 'integer|required'
        ]);

        $currentSquad = Squad::firstOrFail($squad_id);
        $newSquad = Squad::firstOrFail($request->new_squad_id);
        $user = User::firstOrFail($request->user_id);
        $game = $currentSquad->game()->get();
        $requestUser = Auth::user();

        if (!($requestUser == $user || $requestUser->isGameOwner($game))) {
            return Message::error(403, 'Only game owner or the user itself can initialize squad change');
        }

        if ($currentSquad->id !== $newSquad->id) {
            return Message::error(406, 'Users can switch memberships only within the same game');
        }

        if ($newSquad->members()->count() == $newSquad->slots) {
            return Message::error(406, 'User cannot move to the new squad, it is full');
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
     * The request will fail if:
     * - user which posts data is trying to remove someone else than
     *   themselves, while not being the game owner (403)
     * - user does not belong to the squad (406)
     *
     * @group Game management
     * @urlParam squad_id int required Squad id
     * @bodyParam user_id int required User id remove from squad
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, int $squad_id)
    {
        $request->validate([
            'user_id' => 'integer|required'
        ]);

        $squad = Squad::findOrFail($squad_id);
        $user = User::findOrFail($request->user_id);
        $game = $squad->game()->get();
        $requestUser = Auth::user();

        if (!($requestUser == $user || $requestUser->isGameOwner($game))) {
            return Message::error(403, 'Only game owner or the user itself can initialize squad leave');
        }

        if (!$squad->members()->find($user->id)) {
            return Message::error(406, 'This user does not belong to this squad, maybe he has already left');
        }

        $squad->members()->detach($user->id);
        return Message::ok('Squad and game left');
    }
}
