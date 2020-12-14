<?php

use App\Models\User;
use Illuminate\Support\Arr;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;

use function Tests\emailActivationLink;

uses(RefreshDatabase::class);

$creds = [
    'name' => 'foo',
    'email' => 'foo@gmail.com',
    'password' => 'kwakwa5!'
];

it('should register new inactive user with valid credentials', function () use ($creds) {
    $this->postJson('/auth/signup', $creds)
        ->assertOk();

    $this->assertDatabaseHas('users', Arr::except($creds, 'password'))
        ->assertDatabaseHas('users', [
            'email' => $creds['email'],
            'email_verified_at' => null
        ]);
});

it('should send user verification email after proper signup', function () use ($creds) {
    Notification::fake();
    Notification::assertNothingSent();

    $this->postJson('/auth/signup', $creds)
        ->assertOk();

    Notification::assertTimesSent(1, VerifyEmail::class);
});

it('should allow user signin after signup and activation', function () use ($creds) {
    $this->postJson('/auth/signup', $creds)
        ->assertOk();

    $user = User::where('email', $creds['email'])->first();
    $url = emailActivationLink($user);

    $this->get($url)
        ->assertOk();

    $this->postJson('/auth/signin', Arr::except($creds, ['name']))
        ->assertOk();
});
