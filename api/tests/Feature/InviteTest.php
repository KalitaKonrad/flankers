<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mpociot\Teamwork\TeamInvite;

use function Tests\grabAuthToken;
use function Tests\withAuthHeader;

uses(RefreshDatabase::class);

it('should allow team owner to create invite for user', function () {
    $user = User::factory()->create();
    $team = config('teamwork.team_model')::factory()->create();
    $token = grabAuthToken($team->owner_id);

    withAuthHeader($token)
        ->postJson("/teams/invites", [
            'team_id' => $team->id,
            'email' => $user->email
        ])
        ->assertOk();

    $this->assertDatabaseHas('team_invites', [
        'email' => $user->email
    ]);
});

it('should disallow to create more then one invite to the same team for single user', function () {
    $user = User::factory()->create();
    $team = config('teamwork.team_model')::factory()->create();
    $token = grabAuthToken($team->owner_id);

    withAuthHeader($token)
        ->postJson("/teams/invites", [
            'team_id' => $team->id,
            'email' => $user->email
        ])
        ->assertOk();

    withAuthHeader($token)
        ->postJson("/teams/invites", [
            'team_id' => $team->id,
            'email' => $user->email
        ])
        ->assertStatus(406);
});

it('should add user to team after invite accept', function () {
    $user = User::factory()->create();
    $team = config('teamwork.team_model')::factory()->create();
    $token = grabAuthToken($team->owner_id);

    withAuthHeader($token)
        ->postJson("/teams/invites", [
            'team_id' => $team->id,
            'email' => $user->email
        ])
        ->assertOk();

    $invite = TeamInvite::where('email', $user->email)->first();
    $this->get("/teams/invites/$invite->accept_token")
        ->assertOk();

    $this->assertNotNull($team->fresh()->members()->find($user->id));
});

it('should delete invite after it is declined', function () {
    $user = User::factory()->create();
    $team = config('teamwork.team_model')::factory()->create();
    $token = grabAuthToken($team->owner_id);

    withAuthHeader($token)
        ->postJson("/teams/invites", [
            'team_id' => $team->id,
            'email' => $user->email
        ])
        ->assertOk();

    $invite = TeamInvite::where('email', $user->email)->first();
    $this->get("/teams/invites/decline/$invite->deny_token")
        ->assertOk();

    $this->assertDatabaseMissing('team_invites', [
        'email' => $user->email
    ]);
});
