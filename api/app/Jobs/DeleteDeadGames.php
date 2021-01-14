<?php

namespace App\Jobs;

use Carbon\Carbon;
use App\Models\Game;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class DeleteDeadGames implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Remove every game that was not started or scheduled in the last hour
     *
     * @return void
     */
    public function handle()
    {
        Game::where('start_date', null)
            ->where('created_at', '<=', Carbon::now()->subHour()->toDateTimeString())
            ->where('completed', '!=', true)
            ->delete();
    }
}
