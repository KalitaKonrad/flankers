<?php

namespace App\Listeners;

use App\Constants\GameType;
use App\Events\SquadMembersChanged;

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
     * @param  SquadMembersChanged  $event
     * @return void
     */
    public function handle(SquadMembersChanged $event)
    {
        $squad = $event->squad;
        $isTeamGame = $squad->game->type === GameType::TEAM;

        if (!$isTeamGame) {
            return;
        }

        if (!$squad->team_id && $squad->members()->count() == 1) {
            $squad
                ->team()
                ->associate($squad->members()->first()->currentTeam->id)
                ->save();
        }

        if ($squad->team_id && $squad->members()->count() == 0) {
            $squad->team_id = null;
            $squad->save();
        }
    }
}
