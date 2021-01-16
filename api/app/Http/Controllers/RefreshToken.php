<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\RespondsWithJwt;
use Illuminate\Support\Facades\Auth;

class RefreshToken extends Controller
{
    use RespondsWithJwt;

    /**
     * Initialize the controller
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Refresh user JWT token.
     *
     * If authenticated user will access this route new token
     * metadata will be returned as a response.
     *
     * @group Authentication
     * @header Authorization Bearer YOUR_TOKEN_HERE
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke()
    {
        return $this->respondWithToken(Auth::refresh());
    }
}
