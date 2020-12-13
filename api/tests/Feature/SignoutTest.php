<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

use function Tests\grabAuthToken;
use function Tests\withAuthHeader;

uses(RefreshDatabase::class);

it('revokes current request access token', function () {
  $token = grabAuthToken();

  withAuthHeader($token)
    ->postJson('/auth/signout', [])
    ->assertOk();

  withAuthHeader($token)
    ->postJson('/auth/signout', [])
    ->assertStatus(401);
});
