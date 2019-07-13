<?php

use Illuminate\Http\Request;

if (App::environment('production')) {
  URL::forceScheme('https');
}

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::resource('sale', 'Api\MainController');
Route::resource('search', 'Api\SearchController');

Route::post('/login', 'AuthController@login');

Route::group(['middleware' => 'auth:api'], function () {
  Route::get('/me', 'AuthController@me');
  Route::post('/logout', 'AuthController@logout');
});
