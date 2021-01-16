<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Creates a new instance of the controller.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Return current user complete data
     *
     * @group User management
     *
     * @return User
     */
    public function index()
    {
        return User::with('teams')
            ->with('invites')
            ->find(Auth::id());
    }
}
