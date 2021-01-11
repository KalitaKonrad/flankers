<?php

namespace App\Http\Controllers;

use App\Http\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Mpociot\Teamwork\Facades\Teamwork;

class TeamInviteController extends Controller
{
    /**
     * Inititalize the controller
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['auth:api']);
    }

    /**
     * Get user invites
     *
     * @group Team management
     *
     * @param Request $request
     * @return Illuminate\Http\Response
     */
    public function index()
    {
        return Message::ok('User invites', Auth::user()->invites()->get());
    }

    /**
     * Invite user to team
     *
     * @group Team management
     * @bodyParam team_id int required
     * @bodyParam email string required
     *
     * @param Request $request
     * @param int $team_id
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'team_id' => 'required|integer',
            'email' => 'required|email',
        ]);

        $teamModel = config('teamwork.team_model');
        $team = $teamModel::findOrFail($request->team_id);
        $invitedUser = User::where('email', $request->email)->firstOrFail();

        if (!Auth::user()->isOwnerOfTeam($team)) {
            return Message::error(403, 'Only team owner can create invites for this team');
        }

        if (Teamwork::hasPendingInvite($request->email, $team)) {
            return Message::error(403, 'This user was already invited to this team');
        }

        $invite = Teamwork::inviteToTeam($invitedUser->email, $team);
        return Message::ok('Invite sent', $invite);
    }
}
