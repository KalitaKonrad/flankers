<?php

namespace App\Listeners;

use App\Models\GameInvite;
use App\Events\GameCreated;
use App\Events\GameUpdated;

class GenerateGameInvite
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
    public function handle($event)
    {
        $game = $event->game;
        if (!$game->public && $game->invite == null) {
            GameInvite::generate($event->game);
        }
    }

    /**
     * Register the listeners for the subscriber.
     *
     * @param  Illuminate\Events\Dispatcher  $events
     */
    public function subscribe($events)
    {
        $events->listen(
            GameUpdated::class,
            [GenerateGameInvite::class, 'handle']
        );

        $events->listen(
            GameCreated::class,
            [GenerateGameInvite::class, 'handle']
        );
    }
}
