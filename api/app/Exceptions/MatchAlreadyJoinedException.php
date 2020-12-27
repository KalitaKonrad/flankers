<?php

namespace App\Exceptions;

use Exception;

class MatchAlreadyJoinedException extends Exception
{
    protected $message = 'User already joined this match';
}
