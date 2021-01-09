<?php

namespace App\Http\Controllers\Ranking;

use App\Models\User;
use App\Models\Team;
use App\Http\Controllers\Controller;

class LeaderboardController extends Controller
{
    /**
     * Get teams or users sorted by elo rankings
     *
     * @group Leaderboards
     * @urlParam $leaderboard string - 'team' for team leaderboards, 'user' for users
     *
     * @param  int  $game_id
     * @return \Illuminate\Http\Response
     */
    public function show(string $leaderboard)
    {
        if ($leaderboard == 'team') {
            return Team::orderByDesc('elo')->simplePaginate(10);
        }

        return User::orderByDesc('elo')->simplePaginate(10);
    }
}
