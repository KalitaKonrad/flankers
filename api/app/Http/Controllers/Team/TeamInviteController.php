<?php

namespace App\Http\Controllers\Team;

use App\Models\User;
use App\Http\Message;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Mpociot\Teamwork\Facades\Teamwork;
use App\Notifications\TeamInviteCreated;
use Illuminate\Support\Facades\DB;

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
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Message::ok(
            'User invites',
            DB::table('team_invites')
                ->selectRaw('team_invites.*, teams.name as team_name, teams.description as team_description, teams.avatar as team_avatar')
                ->join('teams', 'team_invites.team_id', '=', 'teams.id')
                ->where('email', Auth::user()->email)
                ->orderByDesc('team_invites.created_at')
                ->get()
        );
    }

    /**
     * Invite user to team, it will send notification
     * request to underlying notification service
     *
     * @group Team management
     * @bodyParam team_id int required
     * @bodyParam email string required
     *
     * @param Request $request
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
        $invitedUser->notify(new TeamInviteCreated($team));

        return Message::ok('Invite sent', $invite);
    }
}
