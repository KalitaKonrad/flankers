<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Game;
use App\Http\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PreventInvalidScoring
{
    /**
     * Deny game scoring request if user is not reporting
     * his or her score, or the game has finished.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();
        $game = Game::firstOrFail($request->game_id);
        $squad = $game->squads()->firstOrFail($request->winning_squad);

        if ($game->completed) {
            return Message::error(406, 'Game score cannot be updated after its end');
        }

        if (!$squad->memebers()->find($user->id)) {
            return Message::error(403, 'User did not took part in this game');
        }

        return $next($request);
    }
}
