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
     * @param  string  $leaderboard
     * @return \Illuminate\Contracts\Pagination\Paginator
     */
    public function show(string $leaderboard)
    {
        if ($leaderboard == 'team') {
            return Team::orderByDesc('elo')->simplePaginate(10);
        }

        return User::orderByDesc('elo')->simplePaginate(10);
    }
}
