<?php

namespace App\Http\Controllers\Game;

use App\Models\Game;
use App\Http\Message;
use Illuminate\Support\Arr;
use App\Events\GameCreated;
use App\Events\GameUpdated;
use Illuminate\Support\Carbon;
use App\Structures\GameCommand;
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
     * Return list of all public games or the ones belonging
     * to request user, together with its squads and members.
     * Completed games are not returned.
     *
     * @group Game data
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function index()
    {
        return Game::with('squads', 'squads.members')
            ->where(
                fn ($query) => $query->where('public', true)->orWhere('owner_id', Auth::id())
            )
            ->where('completed', false)
            ->get();
    }

    /**
     * Create new game.
     *
     * @group Game management
     * @bodyParam type string free for all - ffa, or team game - team, default - ffa
     * @bodyParam rated boolean If ranking points should be assigned rated, default - false
     * @bodyParam bet integer Game bet which each user will be charged for, default - 0
     * @bodyParam start_date timestamp Game starting time
     * @bodyParam duration integer Game time in seconds, default - 60 * 10
     * @bodyParam long float Game longitude - default null
     * @bodyParam lat float Game latitude - default null
     * @bodyParam squad_size int Game squad size - default 5
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
            'lat' => null,
            'squad_size' => 5
        ];

        $data = array_merge($defaults, $request->all());
        $game = Game::create($data);

        GameCreated::dispatch($game);

        return Message::ok('Game created', $game->description());
    }

    /**
     * Display details of a game
     *
     * Get all game details with squads,
     * members, and invite codes.
     *
     * @group Game data
     * @urlParam id int required Game id
     *
     * @param  int  $game_id
     * @return \Illuminate\Http\Response
     */
    public function show(int $game_id)
    {
        return Game::findOrFail($game_id)->description();
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
     * These failures return 403 error code
     *
     * @group Game management
     * @bodyParam type string free for all - ffa, or team game - team, default - ffa
     * @bodyParam rated boolean If ranking points should be assigned after the game.
     * @bodyParam bet integer Game bet which each user will be charged for.
     * @bodyParam duration integer Game time in seconds, default
     * @bodyParam start_date timestamp Unix timestamp for game starting time
     * @bodyParam completed boolean True if game should be finalized instantly
     * @bodyParam long Game longitude - default null
     * @bodyParam lat Game latitude - default null
     * @bodyParam command object Game related command
     * @bodyParam command.start_game boolean Start the game
     * @bodyParam command.end_game boolean End started game early, skipping voting timers
     * @bodyParam command.start_voting boolean
     * Start one minute timer in which users can vote, then close the game
     *
     * @param  UpdateGameRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateGameRequest $request, $id)
    {
        $game = Game::findOrFail($id);
        $now = Carbon::now()->timestamp;
        $data = Arr::except($request->all(), ['command']);
        $command = $request->command ?? [];
        $command = new GameCommand($command);

        if ($game->completed) {
            return Message::error(403, 'This game was already completed, you cannot change it');
        }

        if ($command->start_game && $game->start_date && $game->start_date < $now) {
            return Message::error(403, "You cannot start game which already started");
        }

        if ($request->start_date && $game->start_date < $now) {
            return Message::error(403, 'Cannot start game in the past');
        }

        if ($game->start_date && $game->start_date < $now && ($request->rated || $request->bet)) {
            return Message::error(403, 'You cannot change game bets or rating type if it has already started');
        }

        $game->fill($data);
        $game->save();

        GameUpdated::dispatch($game, $command);
        return Message::ok('Game updated', $game);
    }

    /**
     * Delete the game
     *
     * This will fail with 403 code if the
     * game started or was already completed.
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
