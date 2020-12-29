<?php

namespace App\Listeners;

use App\Constants\GameType;
use App\Events\UserJoinedSquad;
use App\Events\UserLeftSquad;

class SetSquadTeam
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
    public function onJoin(UserJoinedSquad $event)
    {
        $squad = $event->squad;
        $user = $event->user;
        $isTeamGame = $squad->game->type === GameType::TEAM;

        if ($isTeamGame && $squad->members()->count() == 1) {
            $squad->team()->associate($user->currentTeam->id)->save();
        }
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function onLeave(UserLeftSquad $event)
    {
        $squad = $event->squad;

        if ($squad->members()->count() == 0) {
            $squad->team_id = null;
            $squad->save();
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
            UserJoinedSquad::class,
            [SetSquadTeam::class, 'onJoin']
        );

        $events->listen(
            UserLeftSquad::class,
            [SetSquadTeam::class, 'onLeave']
        );
    }
}
