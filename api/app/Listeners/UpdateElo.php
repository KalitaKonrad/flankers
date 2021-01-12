<?php

namespace App\Listeners;

use App\Constants\GameType;
use App\Events\GameFinished;
use App\Services\GameService;
use Illuminate\Support\Facades\Log;

class UpdateElo
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(GameFinished $event)
    {
        $game = $event->game;

        if ($game->type == GameType::TEAM) {
            $teamSquadsExist = !$game->squads()->get()->first(function ($squad) {
                return $squad->team == null;
            });

            if (!$teamSquadsExist) {
                Log::info('Cannot rank game, one of the squads did not have team assigned');
                return;
            }
        }

        GameService::square($game);
        Log::info("Game {$game->id} got squared");
    }
}
