<?php

namespace App\Events;

use App\Models\Wallet;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class WalletCharged implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $wallet;
    public $ammount;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Wallet $wallet, float $ammount)
    {
        $this->wallet = $wallet;
        $this->ammount = $ammount;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel("users.{$this->wallet->user->id}");
    }
}
