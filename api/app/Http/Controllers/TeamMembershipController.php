<?php

namespace App\Http\Controllers\Teamwork;

use App\Http\Message;
use App\Models\TeamUser;
use App\Models\User;
use Illuminate\Http\Request;
use Mpociot\Teamwork\TeamInvite;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Mpociot\Teamwork\Facades\Teamwork;

class TeamMembershipController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the members of the given team.
     *
     * @group Team membership management
     * @urlParam teamId int required
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $id)
    {
        $teamModel = config('teamwork.team_model');
        $team = $teamModel::findOrFail($id);

        return Message::ok('Fetched members', $team->user());
    }

    /**
     * Remove user from a team
     *
     * @param int $team_id
     * @param int $user_id
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function destroy($team_id, $user_id)
    {
        $teamModel = config('teamwork.team_model');
        $team = $teamModel::findOrFail($team_id);

        if (TeamUser::where('team_id', $team->id)->count() == 1) {
            return Message::error(
                406,
                'User cannot leave a team if he is the only one in it, please delete the team to do so'
            );
        }

        $requestUser = Auth::user();
        if ($requestUser->id == $user_id && $requestUser->belongsToTeam($team)) {
            $requestUser->detachTeam($team);
            return Message::ok('User left the team');
        }

        if ($requestUser->isOwnerOfTeam($team_id)) {
            $user = User::findOrFail($user_id);
            $user->detachTeam($team);
            return Message::ok('User left the team');
        }

        return Message::error(406, 'Only member of this team or team owner can initialize this leave');
    }

    /**
     * @param Request $request
     * @param int $team_id
     * @return $this
     */
    public function invite(Request $request, $team_id)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $teamModel = config('teamwork.team_model');
        $team = $teamModel::findOrFail($team_id);

        if (!Teamwork::hasPendingInvite($request->email, $team)) {
            Teamwork::inviteToTeam($request->email, $team, function ($invite) {
                Mail::send('teamwork.emails.invite', ['team' => $invite->team, 'invite' => $invite], function ($m) use ($invite) {
                    $m->to($invite->email)->subject('Invitation to join team ' . $invite->team->name);
                });
                // Send email to user
            });
        } else {
            return redirect()->back()->withErrors([
                'email' => 'The email address is already invited to the team.',
            ]);
        }

        return redirect(route('teams.members.show', $team->id));
    }

    /**
     * Resend an invitation mail.
     *
     * @param $invite_id
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function resendInvite($invite_id)
    {
        $invite = TeamInvite::findOrFail($invite_id);
        Mail::send('teamwork.emails.invite', ['team' => $invite->team, 'invite' => $invite], function ($m) use ($invite) {
            $m->to($invite->email)->subject('Invitation to join team ' . $invite->team->name);
        });

        return redirect(route('teams.members.show', $invite->team));
    }
}
