<?php

namespace App\Http\Controllers\Game;

use App\Models\Game;
use App\Models\Memo;
use App\Http\Message;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Middleware\PreventInvalidScoring;
use App\Services\GameService;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class GameMemoController extends Controller
{
    /**
     * Instantiate the controller
     */
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware(PreventInvalidScoring::class)->only(['store', 'update', 'delete']);
    }

    /**
     * Register game score
     *
     * If the score was already set by this user,
     * request will fail with code 406.
     *
     * @group Game management
     * @bodyParam game_id int required Game id to report score for
     * @bodyParam winning_squad int required Squad id to vote for
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

        if (Memo::where('user_id', Auth::id())->first()) {
            return Message::error(403, 'User with this id already reported the game score');
        }

        Memo::create(array_merge(
            $request->all(),
            ['user_id' => Auth::id()]
        ));

        return Message::ok('Score report saved');
    }

    /**
     * Get game score
     *
     * @group Game data
     * @urlParam game_id int required Game id to get report for
     *
     * Data will contain two three keys: <br />
     * - scores(map) - contains vote count for each squad,
     *   record structure - squad_id => vote_count <br />
     * - winners(array) - array of squad ids that won the game,
     *   if single squad has won it will be the only one
     *   there, if there was tie for any number of squads,
     *   multiple keys will be present. <br />
     * - tie(boolean) - marks whether there were more than
     *   one squad that has earned the same number of votes,
     *   used to easily decide whethere there are more then
     *   one item in winners array.
     *
     * @param  int  $game_id
     * @return \Illuminate\Http\Response
     */
    public function show(int $game_id)
    {
        return Message::ok('Current game score', GameService::appraise(
            Game::findOrFail($game_id)
        ));
    }

    /**
     * Update existing memo
     *
     * If the game was not completed, users can change their vote. <br />
     * This request will fail with 403 if the game has finished, <br />
     * or when request user will try to change vote for game <br />
     * in which he has not participated.
     *
     * @group Game management
     * @urlParam game_id int required Game id to get report for
     * @bodyParam winning_squad int required New vote value
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $game_id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $game_id)
    {
        $request->validate([
            'winning_squad' => 'integer|required'
        ]);

        try {
            Memo::where('user_id', Auth::id())
                ->where('game_id', $game_id)
                ->firstOrFail()
                ->fill($request->only(['winning_squad']))
                ->save();
        } catch (ModelNotFoundException $e) {
            return Message::error(403, __('This user did not vote for this game'));
        }

        return Message::ok('Game score updated');
    }

    /**
     * Delete existing memo for a game
     *
     * If the game has already finished, this request <br />
     * will fail with 403 error code, as scores cannot <br />
     * be changed after the game is finished.
     *
     * Also this will fail with 403 if the user <br />
     * will try to delete non-existent vote.
     *
     * @group Game management
     * @urlParam game_id int required Game id to get report for
     * @bodyParam winning_squad int required New vote value
     *
     * @param  int $game_id
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $game_id)
    {
        try {
            Memo::where('user_id', Auth::id())
                ->where('game_id', $game_id)
                ->firstOrFail()
                ->delete();
        } catch (ModelNotFoundException $e) {
            return Message::error(403, __('This user did not vote for this game'));
        }

        return Message::ok('Game score updated');
    }
}
