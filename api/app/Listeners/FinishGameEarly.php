<?php

namespace App\Listeners;

use App\Events\GameUpdated;
use App\Jobs\SettleGame;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class FinishGameEarly
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
    public function handle(GameUpdated $event)
    {
        if ($event->command->end_game) {
            SettleGame::dispatch($event->game->id);
        }
    }
}
