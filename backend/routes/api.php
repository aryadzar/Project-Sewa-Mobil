<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum', 'auth.token_not_expired'])->group(function () {
    // Logout token saat ini
    Route::post('/customer/logout', [AuthController::class, 'logout'])->middleware('role:customer');
    Route::post('/admin/logout', [AuthController::class, 'logout'])->middleware('role:admin');

});

Route::prefix('customer')->group(function(){
    Route::post('/login', [AuthController::class, 'customerLogin']);
    Route::post('/signup', [AuthController::class, 'customerSignUp']);
});
Route::prefix('admin')->group(function(){
    Route::post('/login', [AuthController::class, 'adminLogin']);
});

