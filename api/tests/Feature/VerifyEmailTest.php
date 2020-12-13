<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\URL;

use function Tests\emailActivationLink;
use function Tests\unverifiedUser;

uses(RefreshDatabase::class);

it('should activate user if correct id and hash is provided', function () {
    $user = unverifiedUser();
    $url = emailActivationLink($user);

    $this->get($url)
        ->assertOk();

    $this->assertTrue(!is_null(User::find($user->id)->email_verified_at));
});
