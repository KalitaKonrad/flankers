<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Arr;

uses(RefreshDatabase::class);

beforeEach(function () {
    $user = User::factory()->create();
    $this->authData = Arr::add($user->only(['email']), 'password', 'password');
});

it('returns user token on valid signin', function () {
    $this->postJson('/auth/signin', $this->authData)
        ->assertOk()
        ->assertJson([
            'access_token' => true
        ]);
});

it('returns unauthorized response on invalid auth data', function () {
    $this->postJson('/auth/signin', ['email' => 'foo@gmail.com', 'password' => 'baz'])
        ->assertStatus(401)
        ->assertJson(['error' => true]);
});
