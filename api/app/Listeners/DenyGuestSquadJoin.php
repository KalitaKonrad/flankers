<?php

namespace App\Listeners;

use App\Constants\GameType;
use App\Events\UserAccessesSquad;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Validation\UnauthorizedException;

class DenyGuestSquadJoin
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
    public function handle(UserAccessesSquad $event)
    {
        $squad = $event->squad;
        $user = $event->user;

        if ($squad->game->type !== GameType::TEAM) {
            return;
        }

        if ($squad->team && $squad->team !== $user->team) {
            throw new UnauthorizedException("User cannot join squad which doesn't belong to his team");
        }
    }
}
