<?php

use App\Models\User;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;


uses(RefreshDatabase::class);

it('should reset user password with correct token and data', function () {
    $user = User::factory()->create();
    $token = app(Illuminate\Auth\Passwords\PasswordBroker::class)->createToken($user);
    $pass = 'kwakwa5!';

    $this->postJson("/auth/reset-password", [
        'email' => $user->email,
        'token' => $token,
        'password' => $pass,
        'password_confirmation' => $pass
    ])->assertOk();

    $this->assertTrue(
        Hash::check($pass, User::find($user->id)->password)
    );
});

it('should fail with wrong password confirmation or without it', function () {
    $user = User::factory()->create();
    $token = app(Illuminate\Auth\Passwords\PasswordBroker::class)->createToken($user);

    $this->postJson("/auth/reset-password", [
        'email' => $user->email,
        'token' => $token,
        'password' => 'passwordk123',
        'password_confirmation' => ''
    ])->assertStatus(422);

    $this->postJson("/auth/reset-password", [
        'email' => $user->email,
        'token' => $token,
        'password' => 'passwordk123',
    ])->assertStatus(422);
});

it('should fail with weak passwords', function () {
    $user = User::factory()->create();
    $token = app(Illuminate\Auth\Passwords\PasswordBroker::class)->createToken($user);

    $this->postJson("/auth/reset-password", [
        'email' => $user->email,
        'token' => $token,
        'password' => 'passwo',
        'password_confirmation' => 'passwo'
    ])->assertStatus(422);
});
