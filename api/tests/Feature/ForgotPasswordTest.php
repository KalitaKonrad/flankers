<?php

use App\Models\User;
use Illuminate\Support\Facades\Notification;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('should send user reset email after reset request', function () {
    Notification::fake();
    Notification::assertNothingSent();

    $this->postJson('/auth/forgot-password', User::factory()->create()->only(['email']))
        ->assertOk();

    Notification::assertTimesSent(1, ResetPassword::class);
});

it('should throttle multiple reset requests', function () {
    $payload = User::factory()->create()->only(['email']);

    $this->postJson('/auth/forgot-password', $payload)
        ->assertOk();

    $this->postJson('/auth/forgot-password', $payload)
        ->assertStatus(400)
        ->assertJson(['errors' => true]);
});
