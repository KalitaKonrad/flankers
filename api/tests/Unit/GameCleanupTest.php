<?php

use App\Models\Game;
use App\Jobs\DeleteDeadGames;
use Illuminate\Support\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('removes games which were not started or scheduled in the last hour', function () {
    $games = Game::factory(6)->create();

    $games[0]->update(['start_date' => Carbon::now()->timestamp]);
    $games[1]->update(['completed' => true]);
    $games[2]->update(['start_date' => Carbon::now()->addHour()->timestamp]);
    $games[3]->update(['created_at' => Carbon::now()->subMinutes(30)->timestamp]);
    $games[4]->update(['created_at' => Carbon::now()->subHours(2)->timestamp]);
    $games[5]->update(['created_at' => Carbon::now()->subHour()->timestamp]);

    (new DeleteDeadGames)->handle();

    expect(Game::count())->toEqual(4);
    foreach ([1, 2, 3, 4] as $game_id) {
        $this->assertDatabaseHas('games', [
            'id' => $game_id
        ]);
    }
});
