<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class StagingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::factory()->make();
        $user->email = 'foo@bar.com';
        $user->save();
    }
}
