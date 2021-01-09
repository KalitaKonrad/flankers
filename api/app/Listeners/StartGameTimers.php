<?php

namespace App\Listeners;

use App\Jobs\SettleGame;
use App\Events\GameCreated;
use App\Events\GameUpdated;
use App\Events\GameVotingStarted;
use Illuminate\Support\Carbon;

class StartGameTimers
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
     * Handle the event after game creation.
     *
     * @param  object  $event
     * @return void
     */
    public function handleCreate(GameCreated $event)
    {
        $game = $event->game;

        if ($game->start_date) {
            SettleGame::dispatch($game->id)->delay(
                Carbon::createFromTimestamp($game->start_date)->addSeconds($game->duration)
            );
        }
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handleUpdate(GameUpdated $event)
    {
        $game = $event->game;
        if ($event->command->start_voting) {
            SettleGame::dispatch($game->id)->delay(
                Carbon::createFromTimestamp($game->start_date)->addSeconds(60)
            );
            GameVotingStarted::dispatch($game, 60);
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
            [StartGameTimer::class, 'handleCreate']
        );

        $events->listen(
            GameUpdated::class,
            [StartGameTimer::class, 'handleUpdate']
        );
    }
}
