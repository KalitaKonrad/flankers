<?php

namespace App\Http\Controllers;

use App\Http\Message;
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
     * Display list of user teams
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
        if ($teamModel::where('name', $request->post('name'))->first()) {
            return Message::error(403, 'Team with this name already exists');
        }

        $data = array_merge($request->all(), [
            'owner_id' => $request->user()->getKey(),
        ]);

        $team = $teamModel::create($data);
        $request->user()->attachTeam($team);

        return Message::ok('Team created successfully', $team);
    }

    /**
     * Update specific team
     *
     * Only owner of the team is authorized for
     * this request, other users wil receive
     * 403 authorization error code.
     *
     * @group Team management
     * @urlParam team_id int required
     * @bodyParam name string Team name Example: Flankersi
     * @bodyParam description string Team description Example: Best team ever
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(CreateTeamRequest $request, int $id)
    {
        $teamModel = config('teamwork.team_model');
        $team = $teamModel::findOrFail($id);

        if (!Auth::user()->isOwnerOfTeam($team->id)) {
            return Message::error(403, 'Only owner can update this team');
        }

        $team->fill($request->all());
        $team->save();

        return Message::ok('Team updated successfully', $team);
    }

    /**
     * Delete a team
     *
     * Only team owners can authorize this request.
     * Users that belong to the deleted team
     * will be removed from it.
     *
     * @group Team management
     * @urlParam team_id int required
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        $teamModel = config('teamwork.team_model');
        $team = $teamModel::findOrFail($id);

        if (!Auth::user()->isOwnerOfTeam($team)) {
            return Message::error(403, 'Only owner can update this team.');
        }

        $team->delete();

        $userModel = config('teamwork.user_model');
        $userModel::where('current_team_id', $id)
            ->update(['current_team_id' => null]);

        return Message::ok('Team deleted successfully');
    }
}
