<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

use function Tests\unverifiedUser;
use function Tests\validAuthCreds;
use function Tests\withDefaultPassword;

uses(RefreshDatabase::class);

it('returns user token on valid signin', function () {
    $this->postJson('/auth/signin', validAuthCreds())
        ->assertOk()
        ->assertJson([
            'access_token' => true
        ]);
});

it('returns unauthorized response on invalid auth data', function () {
    $this->postJson('/auth/signin', ['email' => 'foo@gmail.com', 'password' => 'baz'])
        ->assertStatus(401)
        ->assertJson(['errors' => true]);
});

it('should not allow fresh, unverified user', function () {
    $user = unverifiedUser();

    $this->postJson('/auth/signin', withDefaultPassword($user->only('email')))
        ->assertStatus(401);
});
