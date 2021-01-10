<?php

namespace App\Structures;

use Spatie\DataTransferObject\DataTransferObject;

class GameResults extends DataTransferObject
{
    public int $game;
    public array $scores;
    public array $winners;
    public bool $tie;
}
