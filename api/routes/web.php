<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use App\Models\User;
use Illuminate\Support\Facades\Route;

if (config('app.debug') == true) {
    Route::get('/', fn () => view('welcome')->with('user', User::first()));
    Route::get('/stripe', fn () => view('stripe'));
}
