<?php

use App\Models\Game;
use App\Models\User;
use App\Models\Team;
use App\Models\Squad;
use App\Constants\GameType;

use function Tests\grabAuthToken;
use function Tests\withAuthHeader;

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('should return game squads with memberships', function () {
    $game = Game::factory()->create();
    $squads = Squad::factory(2)
        ->state(['game_id' => $game->id])
        ->hasUsers(2)
        ->create();

    withAuthHeader()
        ->getJson('/games/memberships')
        ->assertJson([
            'data' => Squad::with('members')->get()->toArray()
        ]);
});

it('should fetch squad memberships', function () {
    $game = Game::factory()->create();
    $squads = Squad::factory(2)
        ->state(['game_id' => $game->id])
        ->hasUsers(2)
        ->create();

    withAuthHeader()
        ->getJson("/games/memberships/{$squads[0]->id}")
        ->assertJson([
            'data' => $squads[0]->members()->get()->toArray()
        ]);
});

it('should allow user to join a squad', function () {
    $user = User::factory()->create();
    $game = Game::factory()->create();
    $squad = Squad::factory()
        ->state(['game_id' => $game->id])
        ->create();
    $token = grabAuthToken($user->id);

    withAuthHeader($token)
        ->postJson('/games/memberships', [
            'user_id' => $user->id,
            'squad_id' => $squad->id
        ])
        ->assertOk();

    $this->assertDatabaseHas('squad_user', [
        'user_id' => $user->id,
        'squad_id' => $squad->id
    ]);
});

it('should not add user to a full squad', function () {
    $user = User::factory()->create();
    $game = Game::factory()->create();
    $squad = Squad::factory()
        ->state([
            'game_id' => $game->id,
            'slots' => 3
        ])
        ->hasUsers(3)
        ->create();
    $token = grabAuthToken($user->id);

    withAuthHeader($token)
        ->postJson('/games/memberships', [
            'user_id' => $user->id,
            'squad_id' => $squad->id
        ])
        ->assertStatus(406);
});

it('should not add user to a squad in which he already exits', function () {
    $user = User::factory()->create();
    $game = Game::factory()->create();
    $squad = Squad::factory()
        ->state(['game_id' => $game->id])
        ->create();
    $token = grabAuthToken($user->id);

    withAuthHeader($token)
        ->postJson('/games/memberships', [
            'user_id' => $user->id,
            'squad_id' => $squad->id
        ])
        ->assertOk();

    withAuthHeader($token)
        ->postJson('/games/memberships', [
            'user_id' => $user->id,
            'squad_id' => $squad->id
        ])
        ->assertStatus(406);
});

it('should allow user to move between squads', function () {
    $game = Game::factory()->create();
    $squads = Squad::factory(2)
        ->state([
            'game_id' => $game->id,
            'slots' => 3
        ])
        ->hasUsers(2)
        ->create();

    $user = $squads[0]->members()->first();
    $token = grabAuthToken($user->id);

    withAuthHeader($token)
        ->patchJson("/games/memberships/{$squads[0]->id}", [
            'new_squad_id' => $squads[1]->id,
            'user_id' => $user->id
        ])
        ->assertStatus(200);

    $this->assertDatabaseMissing('squad_user', [
        'user_id' => $user->id,
        'squad_id' => $squads[0]->id
    ]);

    $this->assertDatabaseHas('squad_user', [
        'user_id' => $user->id,
        'squad_id' => $squads[1]->id
    ]);
});

it('should allow squad change only within single game', function () {
    $games = Game::factory(2)->create();
    $squad_a = Squad::factory()
        ->state([
            'game_id' => $games[0]->id,
            'slots' => 3
        ])
        ->hasUsers(1)
        ->create();
    $squad_b = Squad::factory()
        ->state([
            'game_id' => $games[1]->id,
            'slots' => 3
        ])
        ->create();

    $user = $squad_a->members()->first();
    $token = grabAuthToken($user->id);

    withAuthHeader($token)
        ->patchJson("/games/memberships/{$squad_a->id}", [
            'new_squad_id' => $squad_b->id,
            'user_id' => $user->id
        ])
        ->assertStatus(406);
});

it('should disallow user squad change to a full squad', function () {
    $game = Game::factory()->create();
    $squad_a = Squad::factory()
        ->state([
            'game_id' => $game->id,
            'slots' => 3
        ])
        ->hasUsers(1)
        ->create();
    $squad_b = Squad::factory()
        ->state([
            'game_id' => $game->id,
            'slots' => 1
        ])
        ->hasUsers(1)
        ->create();

    $user = $squad_a->members()->first();
    $token = grabAuthToken($user->id);

    withAuthHeader($token)
        ->patchJson("/games/memberships/{$squad_a->id}", [
            'new_squad_id' => $squad_b->id,
            'user_id' => $user->id
        ])
        ->assertStatus(406);
});

it('should allow squad leave', function () {
    $game = Game::factory()
        ->state(['type' => GameType::TEAM])
        ->create();
    $squad = Squad::factory()
        ->state(['game_id' => $game->id])
        ->hasUsers(1)
        ->create();
    $user = $squad->members()->first();
    $token = grabAuthToken($user->id);

    withAuthHeader($token)
        ->deleteJson("/games/memberships/{$squad->id}", [
            'user_id' => $user->id
        ]);

    $this->assertDatabaseMissing('squad_user', [
        'squad_id' => $squad->id,
        'user_id' => $user->id
    ]);
});

it('should assign team to a squad for team games when first player joins the squad', function () {
    $user = User::factory()->create();
    $team = Team::factory()
        ->state(['owner_id' => $user->id])
        ->create();
    $game = Game::factory()
        ->state(['type' => GameType::TEAM])
        ->create();
    $squad = Squad::factory()
        ->state(['game_id' => $game->id])
        ->create();
    $token = grabAuthToken($user->id);

    withAuthHeader($token)
        ->postJson('/games/memberships', [
            'user_id' => $user->id,
            'squad_id' => $squad->id
        ])
        ->assertOk();

    $this->assertDatabaseHas('squads', [
        'id' => $squad->id,
        'team_id' => $team->id
    ]);
});

it('should clear team ownership from a squad if last player leaves it', function () {
    $user = User::factory()->create();
    $team = Team::factory()
        ->state(['owner_id' => $user->id])
        ->create();
    $game = Game::factory()
        ->state(['type' => GameType::TEAM])
        ->create();
    $squad = Squad::factory()
        ->state(['game_id' => $game->id])
        ->create();
    $token = grabAuthToken($user->id);

    withAuthHeader($token)
        ->postJson('/games/memberships', [
            'user_id' => $user->id,
            'squad_id' => $squad->id
        ])
        ->assertOk();

    withAuthHeader($token)
        ->deleteJson("/games/memberships/{$squad->id}", [
            'user_id' => $user->id
        ]);

    $this->assertDatabaseHas('squads', [
        'id' => $squad->id,
        'team_id' => null
    ]);
});

it('should deny user from outside the squad team to join it', function () {
    $user = User::factory()->create();
    $badUser = User::factory()->create();
    $team = Team::factory()
        ->state(['owner_id' => $user->id])
        ->create();
    $game = Game::factory()
        ->state(['type' => GameType::TEAM])
        ->create();
    $squad = Squad::factory()
        ->state(['game_id' => $game->id])
        ->create();
    $token = grabAuthToken($user->id);

    withAuthHeader($token)
        ->postJson('/games/memberships', [
            'user_id' => $user->id,
            'squad_id' => $squad->id
        ])
        ->assertOk();

    withAuthHeader($token)
        ->postJson('/games/memberships', [
            'user_id' => $badUser->id,
            'squad_id' => $squad->id
        ])
        ->assertStatus(406);

    $this->assertDatabaseMissing('squad_user', [
        'squad_id' => $squad->id,
        'user_id' => $badUser->id
    ]);
});
