<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

use function Tests\validAuthCreds;

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
        ->assertJson(['error' => true]);
});
