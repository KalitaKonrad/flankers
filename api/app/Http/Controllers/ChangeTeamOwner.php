<?php

namespace App\Http\Controllers;

use App\Http\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChangeTeamOwner extends Controller
{
    /**
     * Change team owner
     *
     * @group Team management
     * @bodyParam team_id int required
     * @bodyParam user_id int required
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
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
        $user = User::findOrFail($user_id);

        if (!Auth::user()->isOwnerOfTeam($team)) {
            return Message::error(403, 'Only team owner can pass its ownership');
        }

        $team->owner_id = $user_id;
        $team->save();

        return Message::ok('Owner changed successfully');
    }
}
