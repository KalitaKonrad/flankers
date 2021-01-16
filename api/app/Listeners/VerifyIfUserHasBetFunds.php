<?php

namespace App\Listeners;

use App\Events\UserAccessesSquad;
use App\Exceptions\InsufficientFundsException;

class VerifyIfUserHasBetFunds
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
     * @param UserAccessesSquad  $event
     * @return void
     */
    public function handle(UserAccessesSquad $event)
    {
        if ($event->user->wallet->balance < $event->squad->game->bet) {
            throw new InsufficientFundsException;
        }
    }
}
