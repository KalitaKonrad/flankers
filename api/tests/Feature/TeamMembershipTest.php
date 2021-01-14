<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function Tests\grabAuthToken;
use function Tests\withAuthHeader;

uses(RefreshDatabase::class);

it('displays users for a single team', function () {
    $team = config('teamwork.team_model')::factory()->create();
    User::factory(3)
        ->create()
        ->each(function ($user) use ($team) {
            $user->attachTeam($team);
        });

    $res = $this->get("/teams/memberships/$team->id")
        ->assertOk();

    $this->assertTrue(count($res['data']) === 4);
});

it('allows for an owner to remove user from team', function () {
    $team = config('teamwork.team_model')::factory()->create();
    $users = User::factory(2)
        ->create()
        ->each(function ($user) use ($team) {
            $user->attachTeam($team);
        });
    $token = grabAuthToken($team->owner_id);

    withAuthHeader($token)
        ->deleteJson("/teams/memberships/$team->id", [
            'user_id' => $users[0]->id
        ])
        ->assertOk();

    $this->assertTrue($team->members()->count() == 2);
});

it('allows for an team member to remove themselves from the team', function () {
    $team = config('teamwork.team_model')::factory()->create();
    $users = User::factory(2)
        ->create()
        ->each(function ($user) use ($team) {
            $user->attachTeam($team);
        });
    $token = grabAuthToken($users[0]->id);

    withAuthHeader($token)
        ->deleteJson("/teams/memberships/$team->id", [
            'user_id' => $users[0]->id
        ])
        ->assertOk();

    $this->assertTrue($team->members()->count() == 2);
});


it('disallows for a team member to leave if he is the only one left', function () {
    $team = config('teamwork.team_model')::factory()->create();
    $token = grabAuthToken($team->owner_id);

    withAuthHeader($token)
        ->deleteJson("/teams/memberships/$team->id", [
            'user_id' => $team->owner_id
        ])
        ->assertStatus(403);
});

it('should disallow non-owners and non-team users to initiate member removal', function () {
    $team = config('teamwork.team_model')::factory()->create();
    $user = User::factory()->create();
    $token = grabAuthToken($user->id);

    withAuthHeader($token)
        ->deleteJson("/teams/memberships/$team->id", [
            'user_id' => $team->owner_id
        ])
        ->assertStatus(403);
});

it('should transfer ownership to any other team user if owner leaves', function () {
    $team = config('teamwork.team_model')::factory()->create();
    $user = User::factory()->create();
    $token = grabAuthToken($team->owner_id);

    $user->attachTeam($team);

    withAuthHeader($token)
        ->deleteJson("/teams/memberships/$team->id", [
            'user_id' => $team->owner_id
        ])
        ->assertStatus(200);

    $this->assertTrue(
        $team->fresh()->owner_id == $user->id
    );
});
