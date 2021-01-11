<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameVictorSquad extends Model
{
    use HasFactory;

    protected $fillable = [
        'game_id',
        'squad_id'
    ];

    public $timestamps = false;

    public function game()
    {
        return $this->belongsTo(Game::class);
    }

    public function squad()
    {
        return $this->belongsTo(Squad::class);
    }
}
