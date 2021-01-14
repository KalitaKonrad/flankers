<?php

namespace App\Http\Controllers\Payment;

use App\Http\Message;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class HasPaymentConnected extends Controller
{
    /**
     * Instantiate the controller
     */
    public function __construct()
    {
        $this->middleware(['auth:api']);
    }

    /**
     * Check if user has stripe payment method connected
     * Return data is boolean value indicating whether
     * it is true or false.
     *
     * @group Payments
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke()
    {
        return Message::ok('Payment method availability check result', Auth::user()->hasDefaultPaymentMethod());
    }
}
