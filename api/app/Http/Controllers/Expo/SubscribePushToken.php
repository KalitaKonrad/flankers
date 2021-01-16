<?php

namespace App\Http\Controllers\Expo;

use App\Http\Message;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class SubscribePushToken extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api']);
    }

    /**
     * Update expo push token
     *
     * @group Notifications
     * @bodyParam expo_token string required Expo token in format of ExpoPushToken[value]
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $request->validate([
            'expo_token' => 'string|required'
        ]);

        $user = Auth::user();
        $user->expo_token = $request->expo_token;
        $user->save();

        return Message::ok('Push token updated');
    }
}
