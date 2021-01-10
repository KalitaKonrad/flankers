<?php

namespace App\Listeners;

use App\Models\Wallet;
use Illuminate\Auth\Events\Registered;

class CreateUserWallet
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
     * Create wallet for an user when it is created
     *
     * @param  object  $event
     * @return void
     */
    public function handle(Registered $event)
    {
        $wallet = Wallet::create([
            'owner_id' => $event->user->id,
            'balance' => 0
        ]);

        $event->user->wallet()->associate($wallet->id);
    }
}
