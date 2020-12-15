<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Memo extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'game_id', 'winning_squad'];

    /**
     * Get user which created the memo
     *
     * @return BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get game related to memo
     *
     * @return BelongsTo
     */
    public function game()
    {
        return $this->belongsTo(Game::class);
    }

    /**
     * Return squad which was chosen as the
     * one which won the game.
     *
     * @return BelongsTo
     */
    public function winningSquad()
    {
        return $this->belongsTo(Squad::class);
    }
}
