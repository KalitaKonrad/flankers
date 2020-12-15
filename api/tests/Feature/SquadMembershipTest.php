<?php

use App\Models\Game;
use App\Models\User;
use App\Models\Squad;
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

// it('should allow user to move between squads', function () {
//     $game = Game::factory()->create();
//     $squads = Squad::factory(2)
//         ->state([
//             'game_id' => $game->id,
//             'slots' => 3
//         ])
//         ->hasUsers(2)
//         ->create();

//     $user = $squads[0]->members()->first();
//     $token = grabAuthToken($user->id);

//     withAuthHeader($token)
//         ->patchJson("/games/memberships/{$squads[0]->id}", [
//             'new_squad_id' => $squads[1]->id,
//             'user_id' => $user->id
//         ])
//         ->assertStatus(200);

//     $this->assertDatabaseMissing('squad_user', [
//         'user_id' => $user->id,
//         'squad_id' => $squads[0]->id
//     ]);

//     $this->assertDatabaseHas('squad_user', [
//         'user_id' => $user->id,
//         'squad_id' => $squads[1]->id
//     ]);
// });

// should allow game owner to move user between squads
// should allow squad change only withing single game
// should disallow user squad change to a full squad

// Should allow squad leave
// should disallow leave from squad other then from the one user already exists in
