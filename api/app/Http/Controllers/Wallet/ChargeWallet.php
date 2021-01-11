<?php

namespace App\Http\Controllers\Wallet;

use Exception;
use App\Http\Message;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ChargeWallet extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(int $ammount)
    {
        $user = Auth::user();
        if (!$user->hasDefaultPaymentMethod()) {
            return Message::error(403, 'You must connect payment method first');
        }

        $user->invoiceFor('Wallet charge', $ammount);
        $user->wallet->charge($ammount);

        return Message::ok('User account charged');
    }
}
