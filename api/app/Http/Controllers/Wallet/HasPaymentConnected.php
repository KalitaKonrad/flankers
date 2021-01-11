<?php

namespace App\Http\Controllers\Wallet;

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
     * Check if user has payment method connected
     *
     * @group Payments
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke()
    {
        return Message::ok('User has payment method connected', Auth::user()->hasDefaultPaymentMethod());
    }
}
