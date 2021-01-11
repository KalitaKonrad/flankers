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

    public function user()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function charges()
    {
        return $this->hasMany(WalletCharge::class);
    }

    public function charge(float $ammount)
    {
        $this->balance += $ammount;
        $this->save();

        WalletCharged::dispatch($this, $ammount);
    }
}
