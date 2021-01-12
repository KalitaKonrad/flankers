<?php

namespace App\Listeners;

use App\Constants\GameType;
use App\Models\Squad;
use App\Events\GameCreated;

class CreateGameSquads
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
    public function handle(GameCreated $event)
    {
        Squad::factory(2)
            ->state([
                'game_id' => $event->game->id,
                'slots' => $event->game->squad_size
            ])
            ->create();
    }
}
