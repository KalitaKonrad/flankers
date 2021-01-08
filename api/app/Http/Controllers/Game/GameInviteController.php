<?php

namespace App\Http\Controllers\Game;

use App\Http\Message;
use App\Models\GameInvite;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class GameInviteController extends Controller
{
    /**
     * Instantiate the controller
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Fetch game related to invite code
     *
     * @param string $code
     * @return void
     */
    public function show(string $code)
    {
        return Message::ok('Game related to invite', GameInvite::findOrFail($code)->game->description());
    }

    /**
     * Create new team
     *
     * User which is creating the team will be set as its owner
     *
     * @group Game management
     * @bodyParam name string required Team name Example: Flankersi
     * @bodyParam description string Team description Example: Best team ever
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(string $code)
    {
        $invite = GameInvite::findOrFail($code);

        if ($invite->game->owner_id != Auth::id()) {
            return Message::error(403, 'Only game owner can delete invites');
        }

        $invite->delete();
        return Message::ok('Invite destroyed');
    }
}
