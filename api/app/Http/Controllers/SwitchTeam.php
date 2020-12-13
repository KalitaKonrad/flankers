<?php

namespace App\Http\Controllers;

use App\Http\Message;
use Illuminate\Support\Facades\Auth;
use Mpociot\Teamwork\Exceptions\UserNotInTeamException;

class SwitchTeam extends Controller
{
    /**
     * Switch current user to the given team.
     *
     * @urlParam id int required Team to switch to
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function __invoke($id)
    {
        $teamModel = config('teamwork.team_model');
        $team = $teamModel::findOrFail($id);
        try {
            Auth::user()->switchTeam($team);
        } catch (UserNotInTeamException $e) {
            abort(403);
        }

        return  Message::ok('Team switched successfully');
    }
}
