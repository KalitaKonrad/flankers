<?php

namespace App\Exceptions;

use App\Http\Message;
use Exception;

class InsufficientFundsException extends Exception
{
    protected $message = 'User does not have sufficient funds';

    /**
     * Render the exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function render()
    {
        return Message::error(403, $this->getMessage());
    }
}
