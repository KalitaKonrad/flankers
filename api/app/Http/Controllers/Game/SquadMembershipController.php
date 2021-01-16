<?php

namespace App\Http\Controllers\Game;

use App\Events\SquadMembersChanged;
use Exception;
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
    public function index()
    {
        return Message::ok('Squad list', Squad::with('members')->get());
    }

    /**
     * Add user to game squad
     *
     * This request will fail with 403 code if: <br />
     * - user will try to join to a full squad <br />
     * - user has already joined the squad <br />
     * - user will try to join team game squad, and the squad is locked
     *   to a team which user does not belong to
     * - user does not have enough funds to pay for the game bet
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

        $squad->assign($user);

        return Message::ok('Squad joined');
    }

    /**
     * Get squad memberships
     *
     * @group Game data
     * @urlParam squad_id int required Squad id
     *
     * @param  int  $squad_id
     * @return \Illuminate\Http\Response
     */
    public function show(int $squad_id)
    {
        return Message::ok('Squad members', Squad::findOrFail($squad_id)->members()->get());
    }

    /**
     * Move member from a squad to antoher within the same game
     *
     *  This request will fail with 403 code if: <br />
     * - request user tries to move someone other than himself, while not being game owner <br />
     * - user will try to move membership between squads from different games <br />
     * - user will try to move to a full squad <br />
     * - user will try to join team game squad, and the squad is locked
     *   to a team which user does not belong to
     *
     * @group Game management
     * @urlParam squad_id int required Squad id
     * @bodyParam new_squad_id int required Squad id to move user to
     * @bodyParam user_id int required User id to move
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $squad_id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $squad_id)
    {
        $request->validate([
            'new_squad_id' => 'integer|required',
            'user_id' => 'integer|required'
        ]);

        $currentSquad = Squad::findOrFail($squad_id);
        $newSquad = Squad::findOrFail($request->new_squad_id);
        $user = User::findOrFail($request->user_id);
        $game = $currentSquad->game;
        $requestUser = Auth::user();

        if (!($requestUser == $user || $requestUser->isGameOwner($game))) {
            return Message::error(403, 'Only game owner or the user itself can initialize squad change');
        }

        if ($currentSquad->game_id !== $newSquad->game_id) {
            return Message::error(403, 'Users can switch memberships only within the same game');
        }

        try {
            DB::beginTransaction();

            $currentSquad->kick($user);
            $newSquad->assign($user);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }

        $memberList = $game->squads()->with('members')->get();

        return Message::ok('Squad changed', $memberList);
    }

    /**
     * Remove user from squad and effectively from game
     *
     * The request will fail with 403 code if: <br />
     * - user which posts data is trying to remove someone else than <br />
     *   themselves, while not being the game owner <br />
     * - user does not belong to the squad
     *
     * @group Game management
     * @urlParam squad_id int required Squad id
     * @bodyParam user_id int required User id remove from squad
     *
     * @param  int  $squad_id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, int $squad_id)
    {
        $request->validate([
            'user_id' => 'integer|required'
        ]);

        $squad = Squad::findOrFail($squad_id);
        $user = User::findOrFail($request->user_id);
        $game = $squad->game;
        $requestUser = Auth::user();

        if (!($requestUser == $user || $requestUser->isGameOwner($game))) {
            return Message::error(403, 'Only game owner or the user itself can initialize squad leave');
        }

        $squad->kick($user);

        return Message::ok('Squad and game left');
    }
}
