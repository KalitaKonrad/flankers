<?php

namespace App\Http\Controllers;

use App\Http\Requests\SigninRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class Signin extends Controller
{
    /**
     * Authenticate user and return API token.
     *
     * @group User management
     * @bodyParam email string required User email
     * @bodyParam password string required User password
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(SigninRequest $request)
    {
        $credentials = $request->only(['email', 'password']);
        var_dump(Auth::attempt($credentials));
        if (!Auth::attempt($credentials)) {
            return response()
                ->json([
                    'error' => 'Invalid auth credentials provided'
                ])
                ->setStatusCode(401);
        }

        $token = User::where('email', $credentials['email'])
            ->first()
            ->createToken('auth')
            ->plainTextToken;

        return response()->json(['token' => $token]);
    }
}
