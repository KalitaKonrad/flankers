<?php

namespace App\Exceptions;

use Exception;

class SquadFullException extends Exception
{
    protected $message = 'Squad is already full';
}
