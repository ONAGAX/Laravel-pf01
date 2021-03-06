<?php

if (App::environment('production')) {
    URL::forceScheme('https');
}

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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::resource('/sales', 'SaleController');
Route::resource('/saledeposit', 'SaleDepositController');
Route::resource('/payable', 'PayableController');
Route::resource('/expense', 'ExpenseController');
Route::resource('/close', 'CloseController');
