<?php

use App\Jobs\SettleGame;
use App\Models\Game;
use App\Models\User;
use Illuminate\Support\Carbon;
use function Tests\grabAuthToken;
use function Tests\withAuthHeader;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Queue;

uses(RefreshDatabase::class);

$data =  [
    'type' => 'ffa',
    'rated' => true,
    'public' => true,
    'bet' => 1,
    'start_date' => null,
    'duration' => 60 * 20,
    'long' => '56.3',
    'lat' => '42.1'
];

it('should create game for authenticated user with request data', function () use ($data) {
    $user = User::factory()->create();
    $correctResponse = array_merge($data, ['owner_id' => $user->id]);

    $this
        ->postJson('/games', [])
        ->assertStatus(401);

    $token = grabAuthToken($user->id);

    withAuthHeader($token)
        ->postJson('/games', $data)
        ->assertOk()
        ->assertJson(['data' => $correctResponse]);

    $this->assertDatabaseHas('games', $correctResponse);
});

it('failed updating game if it was completed', function () use ($data) {
    $user = User::factory()->create();
    $game = Game::factory()->state(['owner_id' => $user->id, 'completed' => true])->create();
    $token = grabAuthToken($user->id);

    withAuthHeader($token)
        ->patchJson("/games/{$game->id}", $game->toArray())
        ->assertStatus(403);
});

it('fail to set game start time in the past', function () use ($data) {
    $user = User::factory()->create();
    $game = Game::factory()->state(['owner_id' => $user->id, 'completed' => true])->create();
    $token = grabAuthToken($user->id);

    withAuthHeader($token)
        ->patchJson("/games/{$game->id}", [
            'start_date' => Carbon::now()->subDay()->timestamp
        ])
        ->assertStatus(403);
});

it('should fail to update game bets or rating type if the game already started', function () use ($data) {
    $user = User::factory()->create();
    $game = Game::factory()->state([
        'owner_id' => $user->id,
        'start_date' => Carbon::now()->subDay()->timestamp
    ])->create();
    $token = grabAuthToken($user->id);

    withAuthHeader($token)
        ->patchJson("/games/{$game->id}", [
            'bet' => 2,
            'rating' => true
        ])
        ->assertStatus(403);
});

it('should delete games correctly', function () use ($data) {
    $user = User::factory()->create();
    $game = Game::factory()->state([
        'owner_id' => $user->id
    ])
        ->hasSquads(2)
        ->create();
    $squads = $game->squads()->get();
    $token = grabAuthToken($user->id);

    withAuthHeader($token)
        ->delete("/games/{$game->id}")
        ->assertOk();

    $this->assertDatabaseMissing('games', $game->toArray());
    $squads->each(fn ($squad) => $this->assertDatabaseMissing('squads', $squad->toArray()));
});

it('should prevent completed and started game deletion', function () use ($data) {
    $user = User::factory()->create();
    $game_completed = Game::factory()->state([
        'owner_id' => $user->id,
        'completed' => true
    ])->create();
    $game_started = Game::factory()->state([
        'owner_id' => $user->id,
        'start_date' => Carbon::now()->subMinutes(15)->timestamp
    ])->create();
    $token = grabAuthToken($user->id);

    withAuthHeader($token)
        ->delete("/games/{$game_completed->id}")
        ->assertStatus(403);

    withAuthHeader($token)
        ->delete("/games/{$game_started->id}")
        ->assertStatus(403);
});

it('should start game with command', function () use ($data) {
    Queue::fake();

    $user = User::factory()->create();
    $game = Game::factory()->state(['owner_id' => $user->id])->create();
    $token = grabAuthToken($user->id);
    $payload = array_merge($game->toArray(), ['command' => ['start_game' => true]]);

    withAuthHeader($token)
        ->patchJson("/games/{$game->id}", $payload)
        ->assertOk();

    expect($game->fresh()->start_date)->toBeInt();
    Queue::assertPushed(SettleGame::class, 1);
});

it('should not allow to start game which has already started', function () use ($data) {
    $user = User::factory()->create();
    $game = Game::factory()->state([
        'owner_id' => $user->id,
        'start_date' => Carbon::now()->subSecond()->timestamp
    ])->create();
    $token = grabAuthToken($user->id);
    $payload = array_merge($game->toArray(), ['command' => ['start_game' => true]]);


    withAuthHeader($token)
        ->patchJson("/games/{$game->id}", $payload)
        ->assertStatus(403);
});
