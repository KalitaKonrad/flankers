<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\UpdateProfileRequest;

class UserSettingsController extends Controller
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
     * @param  int  $userId
     * @return \Illuminate\Http\Response
     */
    public function show(int $id)
    {
        return User::find($id)->only([
            'email',
            'name'
        ]);
    }

    /**
     * Update specified user settings
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $userId
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProfileRequest $request)
    {
        User::find(Auth::id())->update($request->all());

        return [
            'message' => __('Profile updated successfully')
        ];
    }
}
