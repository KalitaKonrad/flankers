<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Schema;

class AddRankingColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->integer('elo')
                ->default(1000);
        });

        Schema::table(Config::get('teamwork.teams_table'), function (Blueprint $table) {
            $table->integer('elo')
                ->default(1000);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('elo');
        });

        Schema::table(Config::get('teamwork.teams_table'), function (Blueprint $table) {
            $table->dropColumn('elo');
        });
    }
}
