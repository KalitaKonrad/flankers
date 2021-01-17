<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class GameVictorSquad extends Model
{
    use HasFactory;

    protected $fillable = [
        'game_id',
        'squad_id'
    ];

    public $timestamps = false;

    /**
     * Return game of the record
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function game()
    {
        return $this->belongsTo(Game::class);
    }

    /**
     * Returd squad which this record belongs to
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function squad()
    {
        return $this->belongsTo(Squad::class);
    }
}
