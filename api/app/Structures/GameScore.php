<?php

namespace App\Structures;

use Spatie\DataTransferObject\DataTransferObject;

class GameScore extends DataTransferObject
{
    public array $scores;
    public array $winners;
    public bool $tie;
}
