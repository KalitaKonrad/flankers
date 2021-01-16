<?php

namespace App\Http\Controllers\Expo;

use App\Http\Message;
use ExponentPhpSDK\Expo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class UnsubscribePushToken extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api']);
    }

    /**
     * Remove user expo token and unsubscribe him from all channels
     *
     * @group Notifications
     *
     * @group Notifications
     * @bodyParam expo_token string required Expo token in format of ExpoPushToken[value]
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $user = Auth::user();

        if ($user->expo_token) {
            $expo = Expo::normalSetup();
            $expo->unsubscribe($user->privateExpoChannel(), $user->expo_token);
            $user->expo_token = null;
            $user->save();
        }

        return Message::ok('Unsubscribe');
    }
}
