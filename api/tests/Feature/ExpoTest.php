<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function Tests\grabAuthToken;
use function Tests\withAuthHeader;

uses(RefreshDatabase::class);

it('saves user notification token', function () {
    $user = User::factory()->create();

    withAuthHeader(grabAuthToken($user->id))
        ->postJson('/user/notifications', [
            'expo_token' => 'ExpoPushToken[xxx]'
        ])
        ->assertOk();

    expect($user->fresh()->expo_token)->toBeString();
});

it('removes user notification token', function () {
    $user = User::factory()->create();

    withAuthHeader(grabAuthToken($user->id))
        ->deleteJson('/user/notifications')
        ->assertOk();

    expect($user->fresh()->expo_token)->toBeNull();
});
