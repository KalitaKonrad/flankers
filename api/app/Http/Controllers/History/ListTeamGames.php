<?php

namespace App\Http\Controllers\History;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class ListTeamGames extends Controller
{
    /**
     * Instantiate the controller
     */
    public function __construct()
    {
        $this->middleware(['auth:api']);
    }

    /**
     * Get team match history
     *
     * This will return paginated query response.
     * Only completed games are returned.
     *
     * @group Team management
     * @urlParam team_id int Team it for which history will be fetched
     *
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function __invoke(int $team_id)
    {
        $result = DB::table('squads')
            ->selectRaw('games.*, squads.id as squad_id, game_victor_squads.squad_id as winner')
            ->join('games', 'games.id', '=', 'squads.game_id')
            ->leftJoin('game_victor_squads', 'squads.id', '=', 'game_victor_squads.squad_id')
            ->where('squads.team_id', $team_id)
            ->where('games.completed', true)
            ->orderByDesc('games.id')
            ->paginate(10);

        foreach ($result->items() as $game) {
            $game->winner = boolval($game->winner);
        }

        return $result;
    }
}
