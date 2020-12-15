<?php

use App\Models\Game;
use App\Models\User;
use function Tests\grabAuthToken;
use function Tests\withAuthHeader;

use Tymon\JWTAuth\Http\Parser\AuthHeaders;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('correctly registers game score vote for winning squad', function () {
    $user = User::factory()->create();
    $game = Game::factory()
        ->state(['owner_id' => $user->id])
        ->hasSquads(2)
        ->create();
    $game->squads()->first()->members()->attach($user);
    $userSquad = $game->squads()->first()->id;
    $token = grabAuthToken($user->id);

    withAuthHeader($token)
        ->postJson('/games/memos', [
            'game_id' => $game->id,
            'winning_squad' => $userSquad
        ])
        ->assertOk();

    $this->assertDatabaseHas('squad_user', [
        'user_id' => $user->id,
        'squad_id' => $userSquad
    ]);
});

it('it should disallow registering game score multiple times', function () {
    $user = User::factory()->create();
    $game = Game::factory()
        ->state(['owner_id' => $user->id])
        ->hasSquads(2)
        ->create();
    $game->squads()->first()->members()->attach($user);
    $userSquad = $game->squads()->first()->id;
    $token = grabAuthToken($user->id);

    withAuthHeader($token)
        ->postJson('/games/memos', [
            'game_id' => $game->id,
            'winning_squad' => $userSquad
        ])
        ->assertOk();

    withAuthHeader($token)
        ->postJson('/games/memos', [
            'game_id' => $game->id,
            'winning_squad' => $userSquad
        ])
        ->assertStatus(403);
});

it('it should show correct computed game scores based on user votes', function () {
    $user = User::factory()->create();
    $game = Game::factory()
        ->state(['owner_id' => $user->id])
        ->hasSquads(2)
        ->create();
    $game->squads()->first()->members()->attach($user);
    $userSquad = $game->squads()->first()->id;
    $token = grabAuthToken($user->id);

    withAuthHeader($token)
        ->postJson('/games/memos', [
            'game_id' => $game->id,
            'winning_squad' => $userSquad
        ])
        ->assertOk();

    withAuthHeader($token)
        ->get("/games/memos/{$game->id}")
        ->assertOk()
        ->assertJson([
            'data' => [
                'scores' => [
                    "{$userSquad}" => 1
                ],
                'winners' => [$userSquad],
                'tie' => false
            ]
        ]);
});

it('it should show ties if multiple squads scored same values', function () {
    $user = User::factory()->create();
    $secondUser = User::factory()->create();
    $game = Game::factory()
        ->state(['owner_id' => $user->id])
        ->hasSquads(2)
        ->create();
    $game->squads()->first()->members()->attach($user);
    $game->squads()->get()[1]->members()->attach($secondUser);
    $userSquad = $game->squads()->first()->id;
    $secondUserSquad = $game->squads()->get()[1]->id;
    $token = grabAuthToken($user->id);

    withAuthHeader($token)
        ->postJson('/games/memos', [
            'game_id' => $game->id,
            'winning_squad' => $userSquad
        ])
        ->assertOk();

    withAuthHeader(grabAuthToken($secondUser->id))
        ->postJson('/games/memos', [
            'game_id' => $game->id,
            'winning_squad' => $secondUserSquad
        ])
        ->assertOk();

    withAuthHeader($token)
        ->get("/games/memos/{$game->id}")
        ->assertOk()
        ->assertJson([
            'data' => [
                'scores' => [
                    "{$userSquad}" => 1,
                    "{$secondUserSquad}" => 1
                ],
                'winners' => [$userSquad, $secondUserSquad],
                'tie' => true
            ]
        ]);
});

it('It should allow to update existing score', function () {
    $user = User::factory()->create();
    $game = Game::factory()
        ->state(['owner_id' => $user->id])
        ->hasSquads(2)
        ->create();
    $game->squads()->first()->members()->attach($user);
    $userSquad = $game->squads()->first()->id;
    $token = grabAuthToken($user->id);

    withAuthHeader($token)
        ->postJson('/games/memos', [
            'game_id' => $game->id,
            'winning_squad' => $userSquad
        ])
        ->assertOk();

    withAuthHeader($token)
        ->patchJson("/games/memos/{$game->id}", [
            'winning_squad' => $userSquad
        ])
        ->assertStatus(200);
});

it("It should disallow score update if the user didn't vote", function () {
    $user = User::factory()->create();
    $game = Game::factory()
        ->state(['owner_id' => $user->id])
        ->hasSquads(2)
        ->create();
    $game->squads()->first()->members()->attach($user);
    $userSquad = $game->squads()->first()->id;
    $token = grabAuthToken($user->id);

    withAuthHeader($token)
        ->patchJson("/games/memos/{$game->id}", [
            'winning_squad' => $userSquad
        ])
        ->assertStatus(403);
});

it("should disallow scoring if game has finished", function () {
    $user = User::factory()->create();
    $game = Game::factory()
        ->state([
            'owner_id' => $user->id,
            'completed' => true
        ])
        ->hasSquads(2)
        ->create();
    $game->squads()->first()->members()->attach($user);
    $userSquad = $game->squads()->first()->id;
    $token = grabAuthToken($user->id);

    withAuthHeader($token)
        ->postJson('/games/memos', [
            'game_id' => $game->id,
            'winning_squad' => $userSquad
        ])
        ->assertStatus(403);
});

it("should disallow scoring if user didn't participate in the game", function () {
    $user = User::factory()->create();
    $game = Game::factory()
        ->state([
            'owner_id' => $user->id,
        ])
        ->hasSquads(2)
        ->create();
    $game->squads()->first()->members()->attach($user);
    $userSquad = $game->squads()->first()->id;

    withAuthHeader()
        ->postJson('/games/memos', [
            'game_id' => $game->id,
            'winning_squad' => $userSquad
        ])
        ->assertStatus(403);
});

it("should allow game score deletion", function () {
    $user = User::factory()->create();
    $game = Game::factory()
        ->state([
            'owner_id' => $user->id,
        ])
        ->hasSquads(2)
        ->create();
    $game->squads()->first()->members()->attach($user);
    $userSquad = $game->squads()->first()->id;
    $token = grabAuthToken($user->id);

    withAuthHeader($token)
        ->postJson('/games/memos', [
            'game_id' => $game->id,
            'winning_squad' => $userSquad
        ])
        ->assertStatus(200);

    withAuthHeader($token)
        ->delete("/games/memos/{$game->id}")
        ->assertStatus(200);

    $this->assertDatabaseMissing('squad_user', [
        'game_id' => $game->id,
        'user_id' => $user->id
    ]);
});

it("should disallow other user vote deletion", function () {
    $user = User::factory()->create();
    $game = Game::factory()
        ->state([
            'owner_id' => $user->id,
        ])
        ->hasSquads(2)
        ->create();
    $game->squads()->first()->members()->attach($user);
    $userSquad = $game->squads()->first()->id;
    $token = grabAuthToken($user->id);

    withAuthHeader($token)
        ->postJson('/games/memos', [
            'game_id' => $game->id,
            'winning_squad' => $userSquad
        ])
        ->assertStatus(200);

    withAuthHeader()
        ->delete("/games/memos/{$game->id}")
        ->assertStatus(403);
});
