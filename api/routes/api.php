<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use App\Http\Controllers\Signin;
use App\Http\Controllers\Signup;
use App\Http\Controllers\Signout;
use App\Http\Controllers\VerifyEmail;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AcceptInvite;
use App\Http\Controllers\RefreshToken;
use App\Http\Controllers\DeclineInvite;
use App\Http\Controllers\ResetPassword;
use App\Http\Controllers\ForgotPassword;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ChangeTeamOwner;
use App\Http\Controllers\Game\GameController;
use App\Http\Controllers\Game\GameInviteController;
use App\Http\Controllers\TeamInviteController;
use App\Http\Controllers\UserAvatarController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\Game\GameMemoController;
use App\Http\Controllers\TeamMembershipController;
use App\Http\Controllers\Game\SquadMembershipController;
use App\Http\Controllers\Ranking\LeaderboardController;

/**
 * ----------------------------------------
 * Auth related routes
 * ----------------------------------------
 */
Route::prefix('auth')->group(function () {
    Route::post('signin', Signin::class);
    Route::post('signout', Signout::class);
    Route::post('refresh', RefreshToken::class);

    Route::post('signup', Signup::class);
    Route::get('signup/verify/{id}/{hash}', VerifyEmail::class)
        ->name('verification.verify');

    Route::post('forgot-password', ForgotPassword::class);
    Route::post('reset-password', ResetPassword::class);
});


/**
 * ----------------------------------------
 * User management routes
 * ----------------------------------------
 */
Route::get('user', [UserController::class, 'index']);
Route::prefix('user')->group(function () {
    Route::get('settings', [UserProfileController::class, 'show']);
    Route::match(['put', 'patch'], 'settings', [UserProfileController::class, 'update']);
    Route::resource('avatar', UserAvatarController::class);
});

/**
 * ----------------------------------------
 * Team routes
 * ----------------------------------------
 */
Route::resource('teams', TeamController::class)
    ->parameters(['teams' => 'team_id']);

Route::prefix('teams')->group(function () {
    Route::post('owner', ChangeTeamOwner::class);
    Route::resource('memberships', TeamMembershipController::class)->parameters([
        'memberships' => 'team_id'
    ]);
    Route::resource('invites', TeamInviteController::class);
    Route::get('invites/{invite}', AcceptInvite::class);
    Route::get('invites/decline/{invite}', DeclineInvite::class);
});

/**
 * ----------------------------------------
 * Game routes
 * ----------------------------------------
 */
Route::prefix('games')->group(function () {
    Route::resource('invites', GameInviteController::class)
        ->only(['show', 'destroy']);

    Route::resource('memos', GameMemoController::class)
        ->parameters(['memos' => 'game_id'])
        ->only(['store', 'show', 'update', 'destroy']);

    Route::resource('memberships', SquadMembershipController::class)
        ->parameters(['memberships' => 'squad_id'])
        ->only(['index', 'store', 'show', 'update', 'destroy']);
});

Route::resource('games', GameController::class)
    ->parameters(['games' => 'game_id'])
    ->only(['index', 'store', 'show', 'update', 'destroy']);

Route::get('/leaderboards/{leaderboard}', [LeaderboardController::class, 'show']);
