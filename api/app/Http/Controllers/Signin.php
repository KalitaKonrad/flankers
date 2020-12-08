<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\SigninRequest;
use App\Http\Traits\RespondsWithJwt;
use Illuminate\Support\Facades\Auth;

class Signin extends Controller
{
    use RespondsWithJwt;

    /**
     * Sign in an user
     * 
     * With valid data provided, this endpoint will return JWT token
     * which can be later used as authorization header to 
     * authenticate other endpoints inside the app.
     *
     * @group Authentication
     * @bodyParam email string required User email Example: foo@bar.com
     * @bodyParam password string required User password Example: password
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(SigninRequest $request)
    {
        $credentials = $request->only(['email', 'password']);
        if (!$token = Auth::attempt($credentials)) {
            return response()
                ->json([
                    'errors' => [
                        'all' => 'Invalid auth credentials provided'
                    ]
                ], 401);
        }

        if (!User::where('email', $credentials['email'])->first()->hasVerifiedEmail()) {
            return response()->json([
                'errors' => [
                    'email' => __('Your email is not verified, please check your mailbox and active it')
                ]
            ], 401);
        }

        return $this->respondWithToken($token);
    }
}
