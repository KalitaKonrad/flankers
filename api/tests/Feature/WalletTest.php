<?php

use App\Models\User;
use App\Models\Wallet;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Testing\RefreshDatabase;

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
    $wallet = Wallet::factory()->create();

    $wallet->charge(5);
    $wallet->charge(10);
    $wallet->charge(-5.5);

    $this->assertDatabaseHas('wallets', [
        'balance' => 9.5
    ]);

    $this->assertDatabaseHas('wallet_charges', [
        'wallet_id' => $wallet->id,
        'ammount' => 5
    ]);

    $this->assertDatabaseHas('wallet_charges', [
        'wallet_id' => $wallet->id,
        'ammount' => 10
    ]);

    $this->assertDatabaseHas('wallet_charges', [
        'wallet_id' => $wallet->id,
        'ammount' => -5.5
    ]);
});
