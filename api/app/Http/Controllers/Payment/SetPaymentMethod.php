<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Http\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SetPaymentMethod extends Controller
{
    /**
     * Update user payment method with given id
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        Auth::user()->updateDefaultPaymentMethod($request->payment_method);
        return Message::ok('Payment method set up');
    }
}
