<?php

namespace App\Http\Controllers\Wallet;

use App\Http\Message;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

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
     * Charge wallet with given ammount
     *
     * User must have payment method connected for this to succeed
     *
     * @group Wallet
     * @body_param ammount float required non-negative ammount which will charge the wallet
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $request->validate([
            'ammount' => 'numeric|required'
        ]);

        $user = Auth::user();
        $ammount = $request->ammount;

        if ($ammount <= 0) {
            return Message::error(400, 'Wallet charge must be positive');
        }

        if (!$user->hasDefaultPaymentMethod()) {
            return Message::error(403, 'You must connect payment method first');
        }

        $user->invoiceFor('Wallet charge', $ammount * 100);
        $user->wallet->charge($ammount);

        return Message::ok('User account charged', $user->wallet);
    }
}
