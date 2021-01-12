<?php

use App\Jobs\SettleGame;
use App\Models\Game;
use App\Models\GameVictorSquad;
use App\Models\Memo;
use App\Models\User;
use Illuminate\Support\Facades\Queue;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function Tests\grabAuthToken;
use function Tests\withAuthHeader;

uses(RefreshDatabase::class);

it('should process non-rated public games from start to end', function () {
    Queue::fake();

    $owner = User::factory()->create();
    $token = grabAuthToken($owner->id);

    $winning_players = User::factory(3)
        ->create()
        ->each(fn ($player) => $player->wallet->charge(10));

    $empty_wallet_player = User::factory()->create();

    $losing_players = User::factory(2)
        ->create()
        ->each(fn ($player) => $player->wallet->charge(10));

    withAuthHeader($token)
        ->post('/games', [
            'type' => 'ffa',
            'rated' => false,
            'public' => true,
            'bet' => 3.0,
            'start_date' => null,
            'long' => 56,
            'lat' => 21,
            'squad_size' => 3
        ])
        ->assertOk();

    $game = Game::where('owner_id', $owner->id)->first();
    $winners = $game->squads()->first();
    $losers = $game->squads()->skip(1)->first();

    /** Three users with funds should be able to join */
    $winning_players->each(
        fn ($player) =>
        withAuthHeader(grabAuthToken($player->id))
            ->post('/games/memberships', [
                'user_id' => $player->id,
                'squad_id' => $winners->id
            ])
            ->assertOk()
    );

    /** Fourth user shouldn't be able to join */
    withAuthHeader(grabAuthToken($losing_players[0]->id))
        ->post('/games/memberships', [
            'user_id' => $losing_players[0]->id,
            'squad_id' => $winners->id
        ])
        ->assertStatus(403);

    /** Nor one without funds should, even to empty squad */
    withAuthHeader(grabAuthToken($empty_wallet_player->id))
        ->post('/games/memberships', [
            'user_id' => $empty_wallet_player->id,
            'squad_id' => $losers->id
        ])
        ->assertStatus(403);

    $losing_players->each(
        fn ($player) =>
        withAuthHeader(grabAuthToken($player->id))
            ->post('/games/memberships', [
                'user_id' => $player->id,
                'squad_id' => $losers->id
            ])
            ->assertOk()
    );

    /** Game should start after this post request  */
    expect($game->fresh()->start_date)->toBeNull();

    withAuthHeader($token)
        ->patch("/games/{$game->id}", [
            "command" => [
                "start_game" => true
            ]
        ])
        ->assertStatus(200);

    expect($game->fresh()->start_date)->toBeInt();

    /** Games scores should be registered  */
    $winning_players->each(
        fn ($player) =>
        withAuthHeader(grabAuthToken($player->id))
            ->post('/games/memos', [
                'game_id' => $game->id,
                'winning_squad' => $winners->id
            ])
    );

    $losing_players->each(
        fn ($player) =>
        withAuthHeader(grabAuthToken($player->id))
            ->post('/games/memos', [
                'game_id' => $game->id,
                'winning_squad' => $losers->id
            ])
            ->assertOk()
    );

    expect(Memo::count())->toEqual(5);

    withAuthHeader($token)
        ->patch("/games/{$game->id}", [
            "command" => [
                "end_game" => true
            ]
        ]);

    Queue::assertPushed(SettleGame::class, 2);

    (new SettleGame($game->id))->handle();

    /** Finally, after game is settled, wallets should update and scores should be registered  */
    $winning_players->each(
        fn ($player) => expect($player->wallet->fresh()->balance)->toEqual(12)
    );

    $losing_players->each(
        fn ($player) => expect($player->wallet->fresh()->balance)->toEqual(7)
    );

    expect(GameVictorSquad::count())->toEqual(1);
});
