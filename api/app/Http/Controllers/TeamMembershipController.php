<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Message;
use App\Models\TeamUser;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;

class TeamMembershipController extends Controller
{
    /**
     * Initialize the controller
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth')->only(['destroy']);
    }

    /**
     * Show the members of the given team.
     *
     * @group Team management
     * @urlParam team_id int required
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $team_id)
    {
        $teamModel = config('teamwork.team_model');
        $team = $teamModel::findOrFail($team_id);

        return Message::ok('Fetched members', $team->members()->get());
    }

    /**
     * Remove user from a team
     *
     * Request will fulfill only if the user who is submitting
     * the request is the passed team owner, or when he
     * tries to remove himself from the team, so
     * $user_id === Auth::user()->id.
     *
     * Unauthorized requests will result in 403 code.
     *
     * Also if you try to remove user from the team if he is
     * the only member there, it will fail with 406 code.
     *
     * @group Team management
     * @urlParam team_id int required Team from which user will be removed
     * @bodyParam user_id int reqired User id to remove
     *
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function destroy(Request $request, int $team_id)
    {
        $request->validate([
            'user_id' => 'integer|required'
        ]);

        $user_id = $request->post('user_id');
        $user = User::findOrFail($user_id);
        $teamModel = config('teamwork.team_model');
        $team = $teamModel::findOrFail($team_id);
        $requestUser = Auth::user();


        $canLeave =
            ($requestUser->id == $user_id && $requestUser->belongsToTeam($team)) ||
            $requestUser->isOwnerOfTeam($team);

        if (!$canLeave) {
            return Message::error(403, 'Only member of this team or team owner can initialize this leave');
        }

        if ($team->members()->count() === 1) {
            return Message::error(
                406,
                'Users cannot leave a team if they\'re the only one in it, please delete the team to do so'
            );
        }

        $this->leave($user, $team);
        return Message::ok('Team left');
    }

    /**
     * Remove user from a team (programatically)
     *
     * @param \App\Models\User $user
     * @param \App\Models\Team $team
     * @return void
     */
    protected function leave($user, $team)
    {
        if ($user->isOwnerOfTeam($team)) {
            $nextOwner = TeamUser::where('team_id', $team->id)
                ->where('user_id', '!=', $user->id)
                ->first()
                ->user_id;

            $team->owner_id = $nextOwner;
            $team->save();
        }

        $user->detachTeam($team);

        return Message::ok('User left the team');
    }
}
