<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'HomeController@index');

Route::group(['prefix' => 'planning'], function () {
    Route::get('/', 'AppController@index');
    Route::get('{any}', 'AppController@index')->where('any', '(.*)'); // pass a link to the Angular ui-router
});

Route::resource('cinema', 'CinemaController');
Route::resource('hall', 'HallController');
Route::resource('movie', 'MovieController');
Route::resource('save', 'SaveController');
Route::resource('download', 'DownloadController');

Route::auth();