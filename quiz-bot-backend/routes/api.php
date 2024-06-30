<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GameController;
use Illuminate\Support\Facades\Route;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:api')->group(function () {
    Route::post('create-room', [GameController::class, 'createRoom']);
    Route::post('join-room', [GameController::class, 'joinRoom']);
    Route::post('submit-answer', [GameController::class, 'submitAnswer']);
    Route::get('questions', [GameController::class, 'getQuestions']);
    Route::get('scores', [GameController::class, 'getScores']);
});
