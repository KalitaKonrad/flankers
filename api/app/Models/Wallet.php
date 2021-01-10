<?php

namespace App\Models;

use App\Events\WalletCharged;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'owner_id',
        'balance'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function charges()
    {
        return $this->hasMany(WalletCharge::class);
    }

    public function charge(int $ammount)
    {
        $this->balance += $ammount;
        $this->save();

        WalletCharged::dispatch($this, $ammount);
    }
}
