<?php

namespace App\Notifications;

use App\Models\Team;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use NotificationChannels\ExpoPushNotifications\ExpoChannel;
use NotificationChannels\ExpoPushNotifications\ExpoMessage;

class TeamInviteCreated extends Notification implements ShouldQueue
{
    use Queueable;

    public $team;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Team $team)
    {
        $this->team = $team;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via()
    {
        return [ExpoChannel::class];
    }

    public function toExpoPush()
    {
        return ExpoMessage::create()
            ->badge(1)
            ->enableSound()
            ->title("Flankers invite!")
            ->body("Your were invited to join a team!")
            ->setJsonData(["team" => $this->team->name]);
    }
}
