<?php

namespace Tests;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

/**
 * Get email and password for a valid, newly created user
 */
function validAuthCreds(): array
{
    return [
        'email' => User::factory()->create()->email,
        'password' => 'password'
    ];
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
