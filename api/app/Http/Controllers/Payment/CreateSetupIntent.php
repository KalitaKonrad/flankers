<?php

namespace App\Http\Controllers\Payment;

use App\Http\Message;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CreateSetupIntent extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api']);
    }

    /**
     * Create stripe payment intent to associate payment method
     * with user account for subsequent purchases.
     *
     * @group Payments
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke()
    {
        return Message::ok('Intent created', Auth::user()->createSetupIntent());
    }
}
