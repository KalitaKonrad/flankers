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
        $this->middleware(['auth:api'])->only(['index']);
    }

    /**
     * Get user invites
     *
     * @param Request $request
     * @return Illuminate\Http\Response
     */
    public function index()
    {
        return Message::ok('User invites', Auth::user()->invites());
    }

    /**
     * @param Request $request
     * @param int $team_id
     * @return $this
     */
    public function store(Request $request, $team_id)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $teamModel = config('teamwork.team_model');
        $team = $teamModel::findOrFail($team_id);

        if (Teamwork::hasPendingInvite($request->email, $team)) {
            return Message::error(406, 'This user was already invited to this team');
        }

        $invite = Teamwork::inviteToTeam($request->email, $team);
        return Message::ok('User invited', $invite);
    }
}
