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
     * @param  \Illuminate\Http\Request  $request
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
