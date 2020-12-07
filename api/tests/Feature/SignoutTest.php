<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Arr;

uses(RefreshDatabase::class);

beforeEach(function () {
  $user = User::factory()->create();
  $this->authData = Arr::add($user->only(['email']), 'password', 'password');
});

it('revokes current request access token', function () {
  $signinResponse = $this->postJson('/auth/signin', $this->authData);
  $token = $signinResponse['access_token'];

  $this->withHeaders([
    'Authorization' => "Bearer $token"
  ])
    ->postJson('/auth/signout', [])
    ->assertStatus(200);

  $this->withHeaders([
    'Authorization' => "Bearer $token"
  ])
    ->postJson('/auth/signout', [])
    ->assertStatus(401);
});
