<?php

namespace App\Structures;

use App\Models\Game;
use Spatie\DataTransferObject\DataTransferObject;

class GameResults extends DataTransferObject
{
    public Game $game;
    public array $scores;
    public array $winners;
    public bool $tie;
}
