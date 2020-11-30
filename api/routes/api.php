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

use App\Http\Controllers\FindGame;
use App\Http\Controllers\GameBetsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GameController;
use App\Http\Controllers\GameInviteController;
use App\Http\Controllers\GameScoreController;
use App\Http\Controllers\JoinGame;
use App\Http\Controllers\SettleGame;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TeamMembershipController;
use App\Http\Controllers\UserAvatarController;
use App\Http\Controllers\UserSettingsController;
use App\Http\Controllers\WalletController;

Route::resource('/user/settings', UserSettingsController::class);
Route::resource('/user/avatar', UserAvatarController::class);
Route::resource('/teams', TeamController::class);
Route::resource('/memberships', TeamMembershipController::class);
Route::prefix('games')->group(function () {
    Route::resource('', GameController::class);
    Route::resource('invites', GameInviteController::class);
    Route::resource('bets', GameBetsController::class);
    Route::resource('scores', GameScoreController::class);
    Route::get('/find', FindGame::class);
    Route::post('/join/{game}', JoinGame::class);
    Route::post('/settle/{game}', SettleGame::class);
});
Route::resource('/wallet', WalletController::class);
