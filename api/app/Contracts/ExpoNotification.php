<?php

namespace App\Contracts;

use Illuminate\Notifications\Notifiable;
use Illuminate\Notifications\Notification;

abstract class ExpoNotification extends Notification
{
    abstract public function toExpo(Notifiable $notifiable): array;
}
