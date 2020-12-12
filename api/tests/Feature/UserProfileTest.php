<?php

use function Tests\grabAuthToken;
use function Tests\withAuthHeader;

it('should update user name correctly', function () {
    $token = grabAuthToken();

    withAuthHeader($token)
        ->patchJson('/user/settings', ['name' => 'updated'])
        ->assertOk();

    withAuthHeader($token)
        ->get('/user/settings')
        ->assertJson([
            'name' => 'updated'
        ]);
});
