<?php

namespace App\Providers;

use App\Events\SampleEvent;
use App\Listeners\SetSquadTeam;
use App\Listeners\BroadcastEvent;
use App\Listeners\GenerateGameInvite;
use App\Listeners\StartGameTimers;
use Illuminate\Support\Facades\Event;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ]
    ];

    protected $subscribe = [
        SetSquadTeam::class,
        StartGameTimers::class,
        GenerateGameInvite::class,
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     *
     * @return bool
     */
    public function shouldDiscoverEvents()
    {
        return true;
    }
}
