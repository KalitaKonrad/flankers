<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class ChangeDefaultUserImage extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('users')
            ->where('avatar', 'https://avatars.dicebear.com/4.5/api/initials/flankers.svg')
            ->update(['avatar' => 'https://eu.ui-avatars.com/api/?format=png&name=flankers']);

        DB::table('teams')
            ->where('avatar', 'https://avatars.dicebear.com/4.5/api/initials/flankers.svg')
            ->update(['avatar' => 'https://eu.ui-avatars.com/api/?format=png&name=flankers']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
