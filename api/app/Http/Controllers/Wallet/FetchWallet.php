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
     * Get current user wallet
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
