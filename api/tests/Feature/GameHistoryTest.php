<?php

use App\Models\Game;
use App\Models\GameVictorSquad;
use App\Models\Team;
use App\Models\User;
use Database\Factories\TeamFactory;

use function Tests\grabAuthToken;
use function Tests\withAuthHeader;

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('should return paginated user games history without incomplete games and with winner information', function () {
    $user = User::factory()->create();
    $games = Game::factory(3)->hasSquads(2)->create();

    // Winning squad, game completed
    $games[0]->squads->first()->assign($user);
    $games[0]->completed = true;
    $games[0]->save();

    GameVictorSquad::create([
        'game_id' => $games[0]->id,
        'squad_id' => $games[0]->squads->first()->id
    ]);

    // Losing squad, game completed
    $games[1]->squads->first()->assign($user);
    $games[1]->completed = true;
    $games[1]->save();

    // Any squad, game not completed, should not be present
    $games[2]->squads->first()->assign($user);

    $response = withAuthHeader(grabAuthToken($user->id))
        ->get('/user/games');

    $response
        ->assertOk()
        ->assertJson(['data' => [
            [
                'id' => $games[1]->id,
                'winner' => false
            ],
            [
                'id' => $games[0]->id,
                'winner' => true
            ]
        ]]);

    expect(count($response['data']))->toEqual(2);
});

it('should return team game history without incomplete games and with winner information', function () {
    $team = Team::factory()->create();
    $games = Game::factory(3)->hasSquads(2)->create();

    // Winning squad, game completed
    $first_squad = $games[0]->squads->first();
    $first_squad->team_id = $team->id;
    $first_squad->save();

    $games[0]->completed = true;
    $games[0]->save();

    GameVictorSquad::create([
        'game_id' => $games[0]->id,
        'squad_id' => $first_squad->id
    ]);

    // Losing squad, game completed
    $second_squad = $games[1]->squads->first();
    $second_squad->team_id = $team->id;
    $second_squad->save();
    $games[1]->completed = true;
    $games[1]->save();

    // Any squad, game not completed, should not be present
    $third_squad = $games[2]->squads->first();
    $third_squad->team_id = $team->id;
    $third_squad->save();

    $response = withAuthHeader()
        ->get("/teams/games/{$team->id}");

    dd($response);

    $response
        ->assertOk()
        ->assertJson(['data' => [
            [
                'id' => $games[1]->id,
                'winner' => false
            ],
            [
                'id' => $games[0]->id,
                'winner' => true
            ]
        ]]);

    expect(count($response['data']))->toEqual(2);
});
