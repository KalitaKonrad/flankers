<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Memo;
use App\Models\User;
use App\Http\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GameMemoController extends Controller
{

    /**
     * Register game score
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'game_id' => 'integer|required',
            'winning_squad' => 'integer|required'
        ]);

        $user = Auth::user();
        $game = Game::firstOrFail($request->game_id);
        $squad = $game->squads()->firstOrFail($request->winning_squad);

        if ($game->completed) {
            return Message::error(406, 'Game score cannot be updated after its end');
        }

        if (!$squad->memebers()->find($user->id)) {
            return Message::error(403, 'User did not took part in this game');
        }

        Memo::create($request->all());
        return Message::ok('Score report saved');
    }

    /**
     * Get game score
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $squads = Game::findOrFail($id)->squads()->get();
        $scores = [];

        $squads->each(
            fn ($squad) => $scores[$squad->id] = Memo::where('winning_team', $squad->id)->count()
        );

        $maxScore = max($scores);
        $winners = array_keys($scores, $maxScore);
        $tie = count($winners) > 1;

        return Message::ok('Current game results', [
            'scores' => $scores,
            'winner' => $winners,
            'tie' => $tie
        ]);
    }

    /**
     * Update existing memo
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $request->validate([
            'game_id' => 'integer|required',
            'winning_squad' => 'integer|required'
        ]);
        $user = Auth::user();
        $game = Game::firstOrFail($request->game_id);
        $squad = $game->squads()->firstOrFail($request->winning_squad);

        if ($game->completed) {
            return Message::error(406, 'Game score cannot be updated after its end');
        }

        if (!$squad->memebers()->find($user->id)) {
            return Message::error(403, 'User does not took part in this game');
        }

        Memo::where('user_id', $user->id)
            ->where('game_id', $game->id)
            ->firstOrFail()
            ->fill($request->only(['winning_squad']))
            ->save();

        return Message::ok('Game score updated');
    }

    /**
     * Delete existing memo for a game
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'game_id' => 'integer|required',
        ]);

        $user = Auth::user();
        $game = Game::firstOrFail($request->game_id);
        $squad = $game->squads()->firstOrFail($request->winning_squad);

        if ($game->completed) {
            return Message::error(406, 'Game score cannot be updated after its end');
        }

        if (!$squad->memebers()->find($user->id)) {
            return Message::error(403, 'User did not took part in this game');
        }

        Memo::where('user_id', $user->id)
            ->where('game_id', $game->id)
            ->firstOrFail()
            ->delete();

        return Message::ok('Game score updated');
    }
}
