<?php

namespace App\Http\Controllers;

use Exception;
use App\Http\Message;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\SignupRequest;
use Illuminate\Auth\Events\Registered;

class Signup extends Controller
{
    /**
     * Register new user
     *
     * Created user will be unverfied, email with activation
     * link is going to be send to provided mail.
     *
     * @group Authentication
     * @bodyParam email string required Example: foo@bar.com
     * @bodyParam name string required User name Example: wosiuto
     * @bodyParam password string required User password Example: kwakwa5!
     *
     * @param  \App\Http\Requests\SignupRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(SignupRequest $request)
    {
        try {
            DB::beginTransaction();

            $user = User::create($request->all());
            event(new Registered($user));

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }

        return Message::ok('User registered successfully, check your email for confirmation link');
    }
}
