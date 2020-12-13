<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

use function Tests\grabAuthToken;
use function Tests\withAuthHeader;

uses(RefreshDatabase::class);

it('should not allow refresh for request without token')
    ->post('/auth/refresh')
    ->assertStatus(401);

it('should not allow refresh for revoked token', function () {
    $token = grabAuthToken();
    withAuthHeader($token)
        ->postJson('/auth/signout')
        ->assertOk();
    withAuthHeader($token)
        ->postJson('/auth/refresh')
        ->assertStatus(401);
});

it('should return new, valid auth token for authenticated user', function () {
    $refreshResponse = withAuthHeader()
        ->post('/auth/refresh')
        ->assertOk();
    $refreshedToken = $refreshResponse['access_token'];

    $this
        ->withHeaders([
            'Authorization' => "Bearer $refreshedToken"
        ])
        ->postJson('/auth/signout')
        ->assertOk();
});
