<?php

namespace App\Http\Controllers;

use App\Http\Message;
use App\Models\TeamUser;
use App\Models\User;

class AcceptInvite extends Controller
{
    /**
     * Accept an invite
     * @group Team management
     * @urlParam token string Invite accept token
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke(string $token)
    {
        $inviteModel = config('teamwork.invite_model');
        $invite = $inviteModel::where('accept_token', $token)->firstOrFail();

        User::where('email', $invite->email)->firstOrFail()->attachTeam($invite->team);
        $invite->delete();

        return Message::ok('Invite accepted');
    }
}
