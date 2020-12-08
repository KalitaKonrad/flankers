<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\SignupRequest;
use Illuminate\Auth\Events\Registered;

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
        try {
            DB::beginTransaction();

            $data = $request->only(['email', 'name', 'password']);
            $user = User::create($data);
            event(new Registered($user));

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return $e;
        }

        return [
            'message' => __('User registered successfully, check your email for confirmation link')
        ];
    }
}
