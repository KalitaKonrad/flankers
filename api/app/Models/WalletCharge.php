<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WalletCharge extends Model
{
    use HasFactory;

    protected $fillable = [
        'wallet_id',
        'amount',
        'source'
    ];

    protected $hidden = [
        'updated_at'
    ];

    public function wallet()
    {
        return $this->belongsTo(Wallet::class);
    }
}
