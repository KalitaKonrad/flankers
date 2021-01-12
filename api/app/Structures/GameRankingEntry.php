<?php

namespace App\Structures;

use Illuminate\Database\Eloquent\Model;
use Spatie\DataTransferObject\DataTransferObject;

class GameRankingEntry extends DataTransferObject
{
    public Model $instance;
    public int $id;
    public int $elo;
    public bool $isWinner;
}
