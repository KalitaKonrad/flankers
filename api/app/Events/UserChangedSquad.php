<?php

namespace App\Events;

use App\Models\Game;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UserChangedSquad
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $game;
    public $squads;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Game $game, array $squads)
    {
        $this->game = $game;
        $this->squads = $squads;
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
