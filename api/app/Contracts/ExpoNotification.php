<?php

namespace App\Contracts;

use Illuminate\Notifications\Notification;

abstract class ExpoNotification extends Notification
{
    /**
     * Cast notification to expo push notification body
     *
     * @return array
     */
    abstract public function toExpo($notifiable): array;
}
