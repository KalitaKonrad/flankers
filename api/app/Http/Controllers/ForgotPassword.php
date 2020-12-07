<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class ForgotPassword extends Controller
{
    /**
     * Set middleware to guest to prvent user auth 
     * when sending password reset request.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['guest']);
    }

    /**
     * Initiate password reset process.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? ['message' => __($status)]
            : response()->json(['message' => 'Could not send reset link', 'errors' => ['status' => __($status)]], 400);
    }
}
