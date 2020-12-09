<?php

namespace Tests;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

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
