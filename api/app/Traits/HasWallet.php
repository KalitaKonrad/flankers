<?php

namespace App\Traits;

use App\Models\Wallet;

trait HasWallet
{
    /**
     * Get wallet class related to model
     */
    public function wallet()
    {
        return $this->hasOne(Wallet::class, 'owner_id');
    }
}
