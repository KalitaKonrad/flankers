<?php

namespace App\Http\Controllers\Wallet;

use Exception;
use App\Http\Message;
use App\Http\Controllers\Controller;
use App\Models\Wallet;
use Illuminate\Support\Facades\Auth;

class FetchWallet extends Controller
{
    /**
     * Instantiate the controller
     */
    public function __construct()
    {
        $this->middleware(['auth:api']);
    }

    /**
     * Get current user wallet with charge history
     *
     * @group Payments
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(int $ammount)
    {
        return Message::ok(
            'Your wallet',
            Wallet::with('charges')->where('owner_id', Auth::id())->firstOrFail()
        );
    }
}
