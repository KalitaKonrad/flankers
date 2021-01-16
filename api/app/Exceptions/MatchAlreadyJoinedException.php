<?php

namespace App\Exceptions;

use Exception;
use App\Http\Message;

class MatchAlreadyJoinedException extends Exception
{
    protected $message = 'User already joined this match';

    /**
     * Render the exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function render($request)
    {
        return Message::error(403, 'Match was already joined');
    }
}
