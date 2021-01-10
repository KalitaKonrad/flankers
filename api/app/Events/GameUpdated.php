<?php

namespace App\Events;

use App\Models\Game;
use App\Structures\GameCommand;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class GameUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Game $game;
    public GameCommand $command;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Game $game, GameCommand $command)
    {
        $this->game = $game;
        $this->command = $command;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel("games.{$this->game->id}");
    }
}
