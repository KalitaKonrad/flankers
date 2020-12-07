<?php

namespace App\Http\Controllers;

use App\Http\Traits\RespondsWithJwt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RefreshToken extends Controller
{
    use RespondsWithJwt;

    /**
     * Instantiate a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('api:auth');
    }

    /**
     * Refresh user JWT token.
     * 
     * @group Authentication
     * @header Authorization Bearer YOUR_TOKEN_HERE
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        return $this->respondWithToken(Auth::refresh());
    }
}
