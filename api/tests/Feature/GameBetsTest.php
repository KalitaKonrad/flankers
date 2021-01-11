<?php

use App\Models\Game;
use App\Models\Memo;
use App\Models\User;
use App\Models\Wallet;
use App\Services\GameService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Arr;

uses(RefreshDatabase::class);

it('should apply bets after game is squared', function () {
    $game = Game::factory()->state(['bet' => 2])->hasSquads(2)->create();
    $winners = $game->squads()->first();
    $losers = $game->squads()->skip(1)->first();

    $winning_players = User::factory(3)
        ->create()
        ->each(fn ($player) => $player->wallet->charge(10));

    $winning_players->each(fn ($user) => $winners->assign($user));

    $losing_players = User::factory(2)
        ->create()
        ->each(fn ($player) => $player->wallet->charge(10));

    $losing_players->each(fn ($user) => $losers->assign($user));

    Memo::create([
        'game_id' => $game->id,
        'winning_squad' => $winners->id,
        'user_id' => $winners->members()->first()->id
    ]);

    GameService::square($game);

    $winning_players->each(
        fn ($user) => $this->assertTrue(abs($user->wallet->fresh()->balance - (10 + (4 / 3))) < 0.00001)
    );
    $losing_players->each(fn ($user) => $this->assertTrue($user->fresh()->wallet->balance == 8));
});
