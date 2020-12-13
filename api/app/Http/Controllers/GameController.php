<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Http\Message;
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
     * @group Game data
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Game::all();
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
            'type' => 'public',
            'rated' => false,
            'public' => true,
            'bet' => 0,
            'duration' => 60 * 10,
            'long' => null,
            'lat' => null
        ];
        $data = array_merge($defaults, $request->all());

        return Message::ok('Game created', Game::create($data));
    }

    /**
     * Display details of a game
     *
     * @group Game data
     * @urlParam id int required Game id
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Game::findOrFail($id);
    }

    /**
     * Update the specified game.
     *
     * @group Game management
     * @bodyParam type string Public or private
     * @bodyParam rated boolean If ranking points should be assigned rated
     * @bodyParam bet integer Game bet which each user will be charged for
     * @bodyParam duration integer Game time in seconds, default
     * @bodyParam start_date timestamp Game starting time
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

        if ($game->completed) {
            return Message::error(406, 'This game was already completed, you cannot change it');
        }

        if ($game->start_date && ($request->rated || $request->bet)) {
            return Message::error(406, 'You cannot change game bets or rating type if it has already started');
        }

        $game->fill($request->all());
        $game->save();

        return Message::ok('Game updated');
    }

    /**
     * Delete the game
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
