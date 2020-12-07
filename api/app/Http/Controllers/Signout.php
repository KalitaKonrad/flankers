<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Signout extends Controller
{
    /**
     * Instantiate a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Sign out current user
     * 
     * Posting to this route with valid user access token
     * inside authorization header will revoke it, thus
     * logging out the current user.
     * 
     * @group Authentication
     * @header Authorization Bearer YOUR_TOKEN_HERE
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        Auth::logout();
        return response()->json(['message' => 'Signed out successfully']);
    }
}
