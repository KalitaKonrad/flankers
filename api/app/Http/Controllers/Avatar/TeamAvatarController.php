<?php

namespace App\Http\Controllers\Avatar;

use App\Models\Team;
use App\Http\Message;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\AvatarUploadRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image as FacadesImage;

class TeamAvatarController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api']);
    }

    /**
     * Get team avatar
     *
     * @group Avatars
     * @urlParam $team_id team id
     *
     * @return \Illuminate\Http\Response
     */
    public function show(int $team_id)
    {
        return Message::ok('Team avatar', Team::findOrFail($team_id)->versioned_avatar);
    }

    /**
     * Update team avatar
     *
     * "Data" key in result will contain new avatar url
     *
     * @group Avatars
     * @bodyParam avatar file required Avatar file, must be image under 4 MB
     * @bodyParam team_id int team id
     *
     * @param  \App\Http\Requests\AvatarUploadRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AvatarUploadRequest $request)
    {
        $team_id = $request->team_id;
        if (!Auth::user()->isOwnerOfTeam($team_id)) {
            return Message::error(403, 'Only owner can update team avatar.');
        }

        $team = Team::findOrFail($team_id);
        $uploadPath = $team->avatarPath();
        $file = $request->file('avatar');
        $url = Storage::cloud()->url($uploadPath);

        $img = FacadesImage::make($file)
            ->resize(300, null, function ($constraint) {
                $constraint->aspectRatio();
            })
            ->stream('jpg');

        Storage::cloud()->put($uploadPath, $img);
        $team->avatar = $url;
        $team->touch();
        $team->save();

        return Message::ok('Avatar changed', $team->versioned_avatar);
    }

    /**
     * Delete team avatar and use default one
     *
     * "Data" key in result will contain new avatar url
     *
     * @group Avatars
     * @urlParam team_id int team id
     *
     * @param  int  $team_id
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $team_id)
    {
        if (!Auth::user()->isOwnerOfTeam($team_id)) {
            return Message::error(403, 'Only owner can update team avatar.');
        }

        $team = Team::findOrFail($team_id);

        Storage::cloud()->delete($team->avatarPath());
        $team->avatar = $team->defaultAvatar();
        $team->save();

        return Message::ok('Avatar deleted', $team->avatar);
    }
}
