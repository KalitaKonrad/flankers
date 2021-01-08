<?php

namespace App\Listeners;

use App\Events\GameCreated;
use App\Events\GameUpdated;
use App\Jobs\FinalizeGame;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Carbon;

class StartGameTimer
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

        if ($game->start_date) {
            FinalizeGame::dispatch($game->id)->delay(
                Carbon::createFromTimestamp($game->start_date)->addSeconds($game->duration)
            );
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
            GameCreated::class,
            [StartGameTimer::class, 'handle']
        );

        $events->listen(
            GameUpdated::class,
            [StartGameTimer::class, 'handle']
        );
    }
}
