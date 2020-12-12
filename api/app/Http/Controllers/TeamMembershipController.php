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
     * @group Team management
     * @bodyParam $team_id int required
     * @bodyParam $user_id int reqired
     *
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'team_id' => 'integer|required',
            'user_id' => 'integer|required'
        ]);

        $data = $request->all();
        $team_id = $data['team_id'];
        $user_id = $data['user_id'];
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
}
