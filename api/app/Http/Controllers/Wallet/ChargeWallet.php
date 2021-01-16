<?php

namespace App\Http\Controllers\Wallet;

use App\Http\Message;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Constants\WalletChargeSource;
use Laravel\Cashier\Exceptions\IncompletePayment;

class ChargeWallet extends Controller
{
    /**
     * Instantiate the controller
     */
    public function __construct()
    {
        $this->middleware(['auth:api']);
    }

    /**
     * Charge wallet with given amount
     *
     * User must have payment method connected for this to succeed.
     * This endpoint may fail if payment action is required for charge,
     * or payment failure occurs. Payment data will be returned on fail
     * inside the response "errors" field.
     *
     * @group Wallet
     * @body_param amount float required non-negative amount which will charge the wallet
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $request->validate([
            'amount' => 'numeric|required'
        ]);

        $user = Auth::user();
        $amount = $request->amount;

        if ($amount <= 0) {
            return Message::error(400, 'Wallet charge must be positive');
        }

        if (!$user->hasDefaultPaymentMethod()) {
            return Message::error(403, 'You must connect payment method first');
        }

        try {
            $user->invoiceFor('Wallet charge', $amount * 100);
        } catch (IncompletePayment $exception) {
            return Message::error(402, $exception->getMessage(), $exception->payment);
        }

        $user->wallet->charge($amount, WalletChargeSource::PURCHASE);

        return Message::ok('User account charged', $user->wallet);
    }
}
