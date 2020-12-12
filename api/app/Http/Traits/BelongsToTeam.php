<?php

namespace App\Http\Traits;

use Mpociot\Teamwork\Traits\UserHasTeams;

trait TeamMember
{
    use UserHasTeams;

    /**
     * Get the token array structure.
     *
     * @param string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function belongsToTeam(int $team_id)
    {
        return $this->teams()->find($team_id) !== null;
    }
}
