<?php

namespace App\Models;

use App\Events\WalletCharged;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Wallet extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'owner_id',
        'balance'
    ];

    protected $casts = [
        'balance' => 'float'
    ];

    /**
     * Get owner of the wallet
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    /**
     * Get all wallet charges
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function charges()
    {
        return $this->hasMany(WalletCharge::class);
    }

    /**
     * Charge the wallet for an ammount, and optionally
     * specify the charge origin, generic otherwise.
     *
     * @return void
     */
    public function charge(float $amount, $source = 'generic')
    {
        $this->balance += $amount;
        $this->save();

        WalletCharged::dispatch($this, $amount, $source);
    }
}
