<?php

use App\Http\Controllers\Api\AdminController;
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

    Route::prefix('admin')->middleware('role:admin')->group(function(){
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/login', [AuthController::class, 'adminLogin']);
        
        Route::get('/users', [AdminController::class, 'get_users']);
        Route::post('/users', [AdminController::class, 'tambah_user']);
        Route::get('/user/{id}', [AdminController::class, 'get_detail_user']);
        Route::put('/user/{id}', [AdminController::class, 'update_users']);
    });
    Route::post('/auth/cek_token', [AuthController::class, 'cek_token']);
});

Route::prefix('customer')->group(function(){
    Route::post('/login', [AuthController::class, 'customerLogin']);
    Route::post('/signup', [AuthController::class, 'customerSignUp']);
});
Route::prefix('admin')->group(function(){
    Route::post('/login', [AuthController::class, 'adminLogin']);
});

