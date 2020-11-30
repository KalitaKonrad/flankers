<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GameBetsController extends Controller
{
    /**
     * List game bets
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $betId
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, int $gameId)
    {
        //
    }

    /**
     * Register bet value for a game
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display informations about game bets
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the information about game bets
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $betId
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $betId)
    {
        //
    }

    /**
     * Remove bets information from a game
     *
     * @param  int  $betId
     * @return \Illuminate\Http\Response
     */
    public function destroy($betId)
    {
        //
    }
}
