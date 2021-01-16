<?php

namespace App\Broadcasting;

use ExponentPhpSDK\Expo;
use App\Contracts\ExpoNotification;
use Illuminate\Support\Facades\Log;

class ExpoChannel
{
    /**
     * Create a new channel instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Send the given notification.
     *
     * @param  mixed  $notifiable
     * @param  \App\Contracts\ExpoNotification  $notification
     * @return void
     */
    public function send($notifiable, ExpoNotification $notification)
    {
        $token = $notifiable->expoToken();
        $message = $notification->toExpo($notifiable);
        $expo = Expo::normalSetup();

        if (!$token) {
            return;
        }

        $expo->subscribe($notifiable->privateExpoChannel(), $token);
        $response = $expo->notify([$notifiable->privateExpoChannel()], $message);

        Log::info("Sent notification on {$notifiable->privateExpoChannel()} with token {$token}");
        Log::info($response);
    }
}
