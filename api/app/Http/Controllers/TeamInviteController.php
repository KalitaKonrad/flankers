<?php

namespace App\Http\Controllers;

use App\Http\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Mpociot\Teamwork\Facades\Teamwork;

class TeamInviteController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api']);
    }

    /**
     * Get user invites
     *
     * @param Request $request
     * @return Illuminate\Http\Response
     */
    public function index()
    {
        return Message::ok('User invites', Auth::user()->invites()->get());
    }

    /**
     * @param Request $request
     * @param int $team_id
     * @return $this
     */
    public function store(Request $request)
    {
        $request->validate([
            'team_id' => 'required|integer',
            'email' => 'required|email',
        ]);

        $teamModel = config('teamwork.team_model');
        $team = $teamModel::findOrFail($request->team_id);

        if (!Auth::user()->isOwnerOfTeam($team)) {
            return Message::error(403, 'Only team owner can create invites for this team');
        }

        if (Teamwork::hasPendingInvite($request->email, $team)) {
            return Message::error(406, 'This user was already invited to this team');
        }

        $invite = Teamwork::inviteToTeam($request->email, $team);
        return Message::ok('User invited', $invite);
    }
}
