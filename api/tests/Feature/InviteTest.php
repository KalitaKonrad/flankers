<?php

use App\Models\User;
use App\Notifications\TeamInviteCreated;
use Mpociot\Teamwork\TeamInvite;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;

use function Tests\grabAuthToken;
use function Tests\withAuthHeader;

uses(RefreshDatabase::class);

it('should allow team owner to create invite for user', function () {
    $user = User::factory()->create();
    $team = config('teamwork.team_model')::factory()->create();
    $token = grabAuthToken($team->owner_id);

    Notification::fake();

    withAuthHeader($token)
        ->postJson("/teams/invites", [
            'team_id' => $team->id,
            'email' => $user->email
        ])
        ->assertOk();

    Notification::assertSentTo([$user], TeamInviteCreated::class);

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
        ->assertStatus(403);
});

it('should fail if invited user does not exist', function () {
    $team = config('teamwork.team_model')::factory()->create();
    $token = grabAuthToken($team->owner_id);

    withAuthHeader($token)
        ->postJson("/teams/invites", [
            'team_id' => $team->id,
            'email' => 'nonexistenmail@example.com'
        ])
        ->assertStatus(404);
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
