<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ListUserGames extends Controller
{
    /**
     * Instantiate the controller
     */
    public function __construct()
    {
        $this->middleware(['auth:api']);
    }

    /**
     * Get user match history
     *
     * This will return paginated query response.
     * Only completed games are returned.
     *
     * @group User management
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke()
    {
        $result = DB::table('games')
            ->selectRaw('games.*, squad_user.squad_id, game_victor_squads.squad_id as winner')
            ->join('squads', 'games.id', '=', 'squads.game_id')
            ->join('squad_user', 'squads.id', '=', 'squad_user.squad_id')
            ->leftJoin('game_victor_squads', 'squads.id', '=', 'game_victor_squads.squad_id')
            ->where('squad_user.user_id', Auth::id())
            ->where('games.completed', true)
            ->orderByDesc('games.id')
            ->paginate(10);

        foreach ($result->items() as $game) {
            $game->winner = boolval($game->winner);
        }

        return $result;
    }
}
