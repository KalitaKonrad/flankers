<?php

namespace App\Traits;

use App\Models\Team;
use Mpociot\Teamwork\Traits\UserHasTeams;

trait TeamMember
{
    use UserHasTeams;

    /**
     * Get the token array structure.
     *
     * @return boolean
     */
    public function belongsToTeam(Team $team)
    {
        return $this->teams()->find($team->id) !== null;
    }
}
