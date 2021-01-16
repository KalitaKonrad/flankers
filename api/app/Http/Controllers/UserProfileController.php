<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\UpdateProfileRequest;

class UserProfileController extends Controller
{
    /**
     * Create controller instance
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display user settings
     *
     * @group User management
     *
     */
    public function show()
    {
        return User::find(Auth::id())->only([
            'email',
            'name'
        ]);
    }

    /**
     * Update specified user settings
     *
     * @group User management
     * @bodyParam email string Example: foo@bar.com
     * @bodyParam name string User name Example: wosiuto
     * @bodyParam password string User password Example: kwakwa5!
     *
     * @param  \App\Http\Requests\UpdateProfileRequest  $request
     */
    public function update(UpdateProfileRequest $request)
    {
        Auth::user()->update($request->all());

        return [
            'message' => __('Profile updated successfully')
        ];
    }
}
