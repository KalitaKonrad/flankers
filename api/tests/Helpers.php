<?php

namespace Tests;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\URL;

/**
 * Return array with default user password
 */
function withDefaultPassword(array $arr)
{
    return array_merge(
        $arr,
        ['password' => 'password']
    );
}

/**
 * Get email and password for a valid, newly created user
 */
function validAuthCreds(): array
{
    return withDefaultPassword([
        'email' => User::factory()->create()->email
    ]);
}

/**
 * Retrieve valid auth jwt token from current session
 */
function grabAuthToken(): string
{
    return Auth::attempt(validAuthCreds());
}

/**
 * Launch new test as authenticated user
 */
function withAuthHeader($token = null)
{
    if (!$token)
        $token = grabAuthToken();

    return test()->withHeaders([
        'Authorization' => "Bearer $token"
    ]);
}

/**
 * Return fresh, unverified user
 */
function unverifiedUser(): User
{
    $creds = validAuthCreds();
    $user = User::where('email', $creds['email'])->first();
    $user->email_verified_at = null;
    $user->save();

    return $user;
}

/**
 * Grav verification link for an user
 */
function emailActivationLink($user)
{
    return URL::temporarySignedRoute(
        'verification.verify',
        Carbon::now()->addMinutes(Config::get('auth.verification.expire', 60)),
        [
            'id' => $user->getKey(),
            'hash' => sha1($user->getEmailForVerification()),
        ]
    );
}
