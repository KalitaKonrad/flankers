<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\URL;

use function Tests\unverifiedUser;

uses(RefreshDatabase::class);

it('should activate user if correct id and hash is provided', function () {
    $user = unverifiedUser();
    $url = URL::temporarySignedRoute(
        'verification.verify',
        Carbon::now()->addMinutes(Config::get('auth.verification.expire', 60)),
        [
            'id' => $user->getKey(),
            'hash' => sha1($user->getEmailForVerification()),
        ]
    );

    $this->get($url)
        ->assertOk();

    $this->assertTrue(!is_null(User::find($user->id)->email_verified_at));
});
