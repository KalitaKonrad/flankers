<?php

namespace App\Http\Controllers\Game;

use App\Models\Game;
use App\Http\Message;
use App\Events\GameCreated;
use Illuminate\Support\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\CreateGameRequest;
use App\Http\Requests\UpdateGameRequest;

class GameController extends Controller
{
    /**
     * Instantiate the controller
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Show list of games
     *
     * Return list of all games, but without details,
     * fetch specified game from here to get more
     * informations.
     *
     * @group Game data
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Game::with('squads')->get();
    }

    /**
     * Create new game.
     *
     * TODO: Right now only public game type is implemented,
     * ranking points will not be calculated, bets won't be
     * deduced and game won't close after time has passed.
     *
     * @group Game management
     * @bodyParam type string Public or private, default - public
     * @bodyParam rated boolean If ranking points should be assigned rated, default - false
     * @bodyParam bet integer Game bet which each user will be charged for, default - 0
     * @bodyParam start_date timestamp Game starting time
     * @bodyParam duration integer Game time in seconds, default - 60 * 10
     * @bodyParam long Game longitude - default null
     * @bodyParam lat Game latitude - default null
     *
     * @param  CreateGameRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateGameRequest $request)
    {
        $defaults = [
            'owner_id' => Auth::id(),
            'type' => 'ffa',
            'rated' => false,
            'public' => true,
            'bet' => 0,
            'duration' => 60 * 10,
            'long' => null,
            'lat' => null
        ];
        $data = array_merge($defaults, $request->all());
        $game = Game::create($data);

        GameCreated::dispatch($game);

        return Message::ok('Game created', $game->with('squads')->find($game->id));
    }

    /**
     * Display details of a game
     *
     * Get all game details with squads
     * and members.
     *
     * @group Game data
     * @urlParam id int required Game id
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $game_id)
    {
        return Game::with('squads', 'squads.members')->findOrFail($game_id);
    }

    /**
     * Update the specified game.
     *
     * You can update all game fields but the process will fail if: <br />
     * - game was already marked as complete <br />
     * - you will set start_date in the past <br />
     * - if you try to update game bets or rating type <br />
     *   after it has started (start_date < now)
     *
     * These failures return 403 code
     *
     * @group Game management
     * @bodyParam type string Public or private
     * @bodyParam rated boolean If ranking points should be assigned rated
     * @bodyParam bet integer Game bet which each user will be charged for
     * @bodyParam duration integer Game time in seconds, default
     * @bodyParam start_date timestamp Unix timestamp for game starting time
     * @bodyParam completed boolean True if game should be finalized instantly
     * @bodyParam long Game longitude - default null
     * @bodyParam lat Game latitude - default null
     *
     * @param  UpdateGameRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateGameRequest $request, $id)
    {
        $game = Game::findOrFail($id);
        $now = Carbon::now()->timestamp;

        if ($game->completed) {
            return Message::error(403, 'This game was already completed, you cannot change it');
        }

        if ($request->start_date && $game->start_date < $now) {
            return Message::error(403, 'Cannot start game in the past');
        }

        if ($game->start_date && $game->start_date < $now && ($request->rated || $request->bet)) {
            return Message::error(403, 'You cannot change game bets or rating type if it has already started');
        }

        $game->fill($request->all());
        $game->save();

        return Message::ok('Game updated', $game);
    }

    /**
     * Delete the game
     *
     * This will fail with 406 code if the
     * game was already completed.
     *
     * @group Game management
     * @urlParam id int required Game id
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $game = Game::findOrFail($id);

        if ($game->start_date && intval($game->start_date) < Carbon::now()->timestamp) {
            return Message::error(403, 'This game has already started, you cannot delete it');
        }

        if ($game->completed) {
            return Message::error(403, 'This game was already completed, you cannot delete it');
        }

        $game->delete();
        return Message::ok('Game deleted');
    }
}
