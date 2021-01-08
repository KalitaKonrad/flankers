<?php

namespace App\Events;

use App\Models\User;
use App\Models\Squad;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;

class UserJoinedSquad implements ShouldBroadcast
{
    use Dispatchable, SerializesModels;

    public $squad;
    public $user;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Squad $squad, User $user)
    {
        $this->squad = $squad;
        $this->user = $user;
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
