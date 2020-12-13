<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function Tests\grabAuthToken;
use function Tests\withAuthHeader;

uses(RefreshDatabase::class);

it('should allow owner to change team ownership', function () {
    $transferUser = User::factory()->create();
    $team = config('teamwork.team_model')::factory()->create();
    $token = grabAuthToken($team->owner_id);

    withAuthHeader($token)
        ->postJson("/teams/owner", [
            'team_id' => $team->id,
            'user_id' => $transferUser->id
        ])
        ->assertOk();
});

it('should disallow any user other than owner to change team ownership', function () {
    $transferUser = User::factory()->create();
    $team = config('teamwork.team_model')::factory()->create();
    $token = grabAuthToken($transferUser->id);

    withAuthHeader($token)
        ->postJson("/teams/owner", [
            'team_id' => $team->id,
            'user_id' => $transferUser->id
        ])
        ->assertStatus(403);
});
