<?php

namespace App\Structures;

use Spatie\DataTransferObject\DataTransferObject;

class GameCommand extends DataTransferObject
{
    public bool $start_voting = false;
}
