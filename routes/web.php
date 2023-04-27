<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\HotelController;

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
    return Inertia::render('First' );
});

Route::get('/dashboard', function () {
    return Inertia::render('Second');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';


Route::post("/hotel/filter", [\App\Http\Controllers\HotelController::class, "filter"])->name("hotel.filter");
Route::post('/hotel/forget', [\App\Http\Controllers\HotelController::class, 'forget'])->name('hotel.forget');
Route::get('/hotel/order/{field}/{dir}', [\App\Http\Controllers\HotelController::class, "order"])->name("hotel.order");
Route::get('/hotel/{hotel_id}/{user_id}/attend', [HotelController::class, 'attend'])->name('hotel.attend');


Route::middleware('auth')->group(function () {

    Route::resource('hotel', HotelController::class)->only([
        'index'
    ]);
    Route::resource('country', CountryController::class);

});

Route::middleware(['auth', 'editHotels'])->group(function (){
    Route::resource('hotel', HotelController::class)->except([
        'index'
    ]);

});









//
//
//
//Route::resource('category', \App\Http\Controllers\CategoryController::class)->only([
//    'index'
//]);
//
//Route::middleware("editTypes")->group( function(){
//    Route::resource('category', \App\Http\Controllers\CategoryController::class)->except(['index']);
//    Route::get('/event/{event_id}/{user_id}/attend', [\App\Http\Controllers\EventController::class, 'attend'])->name('event.attend');
//    Route::get("/event/order/{field}/{dir}", [\App\Http\Controllers\EventController::class, "order"])->name("event.order");
//});
//
//Route::middleware('auth')->group(function (){
//    Route::resource('event', \App\Http\Controllers\EventController::class);
//});

