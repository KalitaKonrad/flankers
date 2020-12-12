<?php

namespace App\Http;

class Message
{
    /**
     * Return ok response with message
     *
     * @param string $message
     * @return void
     */
    public static function ok(string $message)
    {
        return response([
            'message' => __($message)
        ]);
    }
}
