<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Schema;

class AddSquadTeamColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('squads', function ($table) {
            $table->bigInteger('team_id')->nullable();

            $table->foreign('team_id')
                ->references('id')
                ->on(Config::get('teamwork.teams_table'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropColumns('squads', ['team_id']);
    }
}
