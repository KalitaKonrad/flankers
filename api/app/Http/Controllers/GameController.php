<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Http\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\CreateGameRequest;

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
     *  Create new game.
     *
     * TODO: Right now only public game type is implemented,
     * ranking points will not be calculated, bets won't be
     * deduced and game won't close after time has passed.
     *
     * @group Game management
     * @bodyParam type string Public or private, default - public
     * @bodyParam rated boolean If ranking points should be assigned rated, default - false
     * @bodyParam bet integer Game bet which each user will be charged for, default - 0
     * @bodyParam duration integer Game time in seconds, default - 60 * 10,
     * @bodyParam long Game longitude - default null
     * @bodyParam lat Game latitude - default null
     *
     * @param  \App\Requests\CreateGameRequest $request
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified game.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
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
