<?php

namespace App\Models;

use Exception;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class GameInvite extends Model
{
    use HasFactory;

    protected $primaryKey = 'code';

    protected $casts = [
        'code' => 'string'
    ];

    public function game()
    {
        return $this->belongsTo(Game::class);
    }

    public static function generate($game, $retries = 0)
    {
        $code = Str::upper(Str::random(6));

        try {
            $instance = new GameInvite();
            $instance->code = $code;
            $instance->game()->associate($game->id);
            $instance->save();

            return $instance;
        } catch (Exception $e) {
            if ($retries == 5)
                throw $e;
            return self::generate($retries + 1);
        }
    }
}
