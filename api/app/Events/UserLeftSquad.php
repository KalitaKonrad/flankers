<?php

namespace App\Events;

use App\Models\User;
use App\Models\Squad;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;

class UserLeftSquad
{
    use Dispatchable, SerializesModels;

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
}
