<?php

namespace App\Http\Controllers;

use App\Http\Message;

class DeclineInvite extends Controller
{
    /**
     * Decline an invite
     *
     * @urlParam token string Invite decline token
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke(string $token)
    {
        $inviteModel = config('teamwork.invite_model');
        $invite = $inviteModel::where('deny_token', $token)->firstOrFail();
        $invite->delete();

        return Message::ok('Invite declined');
    }
}
