<?php

namespace App\Http;

use Illuminate\Http\Response;

class Message
{
    /**
     * Return ok response with message
     *
     * @param string $message
     * @return \Illuminate\Http\Response
     */
    public static function ok(string $message, $data = [])
    {
        return response([
            'message' => __($message),
            'data' => $data
        ]);
    }

    /**
     * Return error response with message
     *
     * @param string $message
     * @return \Illuminate\Http\Response
     */
    public static function error(int $code, string $message, $errors = [])
    {
        return response([
            'message' => __($message),
            'errors' => $errors
        ], $code);
    }
}
