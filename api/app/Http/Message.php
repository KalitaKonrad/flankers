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
     * @return void
     */
    public static function error(int $code, string $message, $errors = [])
    {
        return response([
            'message' => __($message),
            'errors' => $errors
        ]);
    }
}
