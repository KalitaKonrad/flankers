<?php

namespace App\Events;

use App\Models\Squad;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class SquadMembersChanged implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $squads;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Squad $squad)
    {
        $this->squads = $squad->game->squads()->with('members')->get();
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel("games.{$this->squad->game->id}");
    }
}
