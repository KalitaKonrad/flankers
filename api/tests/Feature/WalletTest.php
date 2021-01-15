<?php

use App\Constants\WalletChargeSource;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function Tests\grabAuthToken;
use function Tests\withAuthHeader;

uses(RefreshDatabase::class);

it('should create empty wallet for registered user', function () {
    $user = User::factory()->create();
    event(new Registered($user));

    $this->assertDatabaseHas('wallets', [
        'owner_id' => $user->id,
        'balance' => 0
    ]);
});

it('should charge and create payment record', function () {
    $wallet = User::factory()->create()->wallet;

    $wallet->charge(5);
    $wallet->charge(10, WalletChargeSource::GAME_LOST);
    $wallet->charge(-5.5);

    $this->assertDatabaseHas('wallets', [
        'balance' => 9.5
    ]);

    $this->assertDatabaseHas('wallet_charges', [
        'wallet_id' => $wallet->id,
        'amount' => 5,
        'source' => 'generic'
    ]);

    $this->assertDatabaseHas('wallet_charges', [
        'wallet_id' => $wallet->id,
        'amount' => 10,
        'source' => 'game_lost'
    ]);

    $this->assertDatabaseHas('wallet_charges', [
        'wallet_id' => $wallet->id,
        'amount' => -5.5
    ]);
});

it('should be fetchable', function () {
    $user = User::factory()->create();
    $wallet = $user->wallet;
    $wallet->charge(5);
    $wallet->charge(10);

    withAuthHeader(grabAuthToken($user->id))
        ->get('/wallet')
        ->assertOk()
        ->assertJson([
            'data' => [
                'id' => $wallet->id,
                'balance' => 15.0,
                'charges' => [
                    [
                        'amount' => 5,
                        'source' => 'generic'
                    ],
                    [
                        'amount' => 10
                    ]
                ]
            ]
        ]);
});
