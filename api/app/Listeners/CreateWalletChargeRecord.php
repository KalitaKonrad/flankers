<?php

namespace App\Listeners;

use App\Models\WalletCharge;
use App\Events\WalletCharged;

class CreateWalletChargeRecord
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
     * Create wallet charge record
     *
     * @param  object  $event
     * @return void
     */
    public function handle(WalletCharged $event)
    {
        $wallet = $event->wallet;
        $charge = WalletCharge::create([
            'wallet_id' => $wallet->id,
            'amount' => $event->amount,
            'source' => $event->source
        ]);
        $wallet->charges()->save($charge);
    }
}
