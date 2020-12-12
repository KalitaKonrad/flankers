<?php

namespace App\Http\Controllers\Teamwork;

use App\Http\Message;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\CreateTeamRequest;

class TeamController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display list o fuser teams
     *
     * @group Team management
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Auth::user()->teams;
    }

    /**
     * Create new team
     *
     * User which is creating the team will be set as its owner
     *
     * @group Team management
     * @bodyParam name string required Team name Example: Flankersi
     * @bodyParam description string Team description Example: Best team ever
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateTeamRequest $request)
    {
        $teamModel = config('teamwork.team_model');
        $payload = $request->only(['name', 'description']);
        $data = array_merge($payload, [
            'owner_id' => $request->user()->getKey(),
        ]);

        $team = $teamModel::create($data);
        $request->user()->attachTeam($team);

        return Message::ok('Team created successfully', $team);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        $teamModel = config('teamwork.team_model');

        $team = $teamModel::findOrFail($id);
        $team->name = $request->name;
        $team->save();

        return redirect(route('teams.index'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $teamModel = config('teamwork.team_model');

        $team = $teamModel::findOrFail($id);
        if (!Auth::user()->isOwnerOfTeam($team)) {
            abort(403);
        }

        $team->delete();

        $userModel = config('teamwork.user_model');
        $userModel::where('current_team_id', $id)
            ->update(['current_team_id' => null]);

        return redirect(route('teams.index'));
    }
}
