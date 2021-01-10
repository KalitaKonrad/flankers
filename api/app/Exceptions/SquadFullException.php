<?php

namespace App\Exceptions;

use Exception;
use App\Http\Message;

class SquadFullException extends Exception
{
    protected $message = 'Squad is already full';

    /**
     * Render the exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function render($request)
    {
        return Message::error(406, 'This squad is already full');
    }
}
