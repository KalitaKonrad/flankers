<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Signout extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $request->user()->tokens()->where('id', 'auth')->delete();
    }
}
