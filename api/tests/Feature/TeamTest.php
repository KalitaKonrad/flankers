<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function Tests\grabAuthToken;
use function Tests\withAuthHeader;

uses(RefreshDatabase::class);

it('should allow authorized user to create new team', function () {
    $team = [
        'name' => 'flankers',
        'description' => 'foobar'
    ];

    withAuthHeader()
        ->postJson('/teams', $team)
        ->assertOk()
        ->assertJson([
            'data' => $team
        ]);

    $this->assertDatabaseHas('teams', $team);
});

it('should not allow to create team with same name', function () {
    $team = [
        'name' => 'flankers',
        'description' => 'foobar'
    ];

    withAuthHeader()
        ->postJson('/teams', $team)
        ->assertOk();

    withAuthHeader()
        ->postJson('/teams', $team)
        ->assertStatus(406);
});

it('should allow to update existing team', function () {
    $team = [
        'name' => 'flankers',
        'description' => 'foobar'
    ];
    $updatedTeam = [
        'name' => 'flankers2',
        'description' => 'foobar2'
    ];
    $token = grabAuthToken();

    $res = withAuthHeader($token)
        ->postJson('/teams', $team)
        ->assertOk();

    $team = $res['data']['id'];
    withAuthHeader($token)
        ->putJson("/teams/$team", $updatedTeam)
        ->assertOk();

    $this->assertDatabaseHas('teams', $updatedTeam);
});

it('should fail while updating non-existent team', function () {
    $team = [
        'name' => 'flankers',
        'description' => 'foobar'
    ];

    withAuthHeader()
        ->putJson('/teams/100', $team)
        ->assertStatus(404);
});

it('should allow for team owner to delete the team', function () {
    $team = [
        'name' => 'flankers',
        'description' => 'foobar'
    ];
    $token = grabAuthToken();

    withAuthHeader($token)
        ->postJson("/teams", $team)
        ->assertOk();

    withAuthHeader($token)
        ->delete('/teams/1')
        ->assertOk();

    $this->assertDatabaseMissing('teams', $team);
});

it('should disallow for any other user than owner to delete the team', function () {
    $team = [
        'name' => 'flankers',
        'description' => 'foobar'
    ];

    withAuthHeader()
        ->postJson("/teams", $team)
        ->assertOk();

    withAuthHeader()
        ->delete('/teams/1')
        ->assertStatus(403);
});

it('should remove all users from the team if it was deleted', function () {
    $team = [
        'name' => 'flankers',
        'description' => 'foobar'
    ];
    $token = grabAuthToken();

    $res = withAuthHeader($token)
        ->postJson("/teams", $team)
        ->assertOk();
    $teamId = $res['data']['id'];

    User::factory(3)
        ->create()
        ->each(function ($user) use ($teamId) {
            $user->current_team_id = $teamId;
            $user->save();
        });

    withAuthHeader($token)
        ->delete('/teams/1')
        ->assertOk();

    $this->assertTrue(User::where('current_team_id', $teamId)->count() == 0);
});
