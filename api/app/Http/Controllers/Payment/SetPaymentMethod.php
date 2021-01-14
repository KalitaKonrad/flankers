<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Http\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SetPaymentMethod extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api']);
    }
    /**
     * Update user payment method with given
     * stripe payment method id.
     *
     * @group Payments
     * @body_param payment_method required stripe payment method id
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $request->validate([
            'payment_method' => 'string|required',
        ]);

        $user = Auth::user();

        if (!$user->hasStripeId()) {
            $user->createAsStripeCustomer();
        }

        $user->updateDefaultPaymentMethod($request->payment_method);
        return Message::ok('Payment method set up');
    }
}
