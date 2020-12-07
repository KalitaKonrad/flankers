<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\SignupRequest;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\DB;

class Signup extends Controller
{
    /**
     * Register new user
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(SignupRequest $request)
    {
        DB::transaction(function () use ($request) {
            $data = $request->only(['email', 'name', 'password']);
            $user = User::create($data);

            event(new Registered($user));
        });

        return [
            'message' => __('User registered successfully, check your email for confirmation link')
        ];
    }
}
