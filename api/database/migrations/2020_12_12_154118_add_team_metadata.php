<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Schema;

class AddTeamMetadata extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table(Config::get('teamwork.teams_table'), function (Blueprint $table) {
            $table->string('description')->default('');
            $table->string('avatar')->default('https://eu.ui-avatars.com/api/?format=png&name=flankers');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table(Config::get('teamwork.teams_table'), function (Blueprint $table) {
            $table->dropColumn(['description', 'avatar']);
        });
    }
}
