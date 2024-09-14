<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AiController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\ScoreController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/change-password', [AuthController::class, 'changePassword'])->middleware('auth:sanctum');

// Protected routes
Route::middleware('auth:api')->group(function () {
    // Game-related routes
    Route::post('create-room', [GameController::class, 'createRoom']);
    Route::post('join-room', [GameController::class, 'joinRoom']);
    Route::post('/select-category', [GameController::class, 'selectCategory']);
    Route::patch('update-room-category/{room_id}/{category_id}', [GameController::class, 'updateRoomCategory']);
    Route::post('save-score', [GameController::class, 'saveScore'])->middleware('auth:api');
    Route::get('/latest-scores', [GameController::class, 'getScores'])->middleware('auth:api');
    Route::get('/users/scores', [GameController::class, 'getAllUsersScores']);
    Route::post('/next-level', [GameController::class, 'nextLevel']);
    Route::middleware('auth:api')->get('/current-user', [GameController::class, 'getCurrentUser']);

    //AI Bot
    Route::post('/openai', [AiController::class, 'askAi']);
    Route::post('/api/openai', [AiController::class, 'getHint']);

    // Score-related routes
    Route::get('/scores', [ScoreController::class, 'index']);
    Route::post('/scores', [ScoreController::class, 'store']);

    // User-related routes
    Route::get('/users', [AdminController::class, 'getUsers']);

    // Admin-related routes
    Route::post('/categories', [AdminController::class, 'createCategory']);
    Route::put('/categories/{id}', [AdminController::class, 'updateCategory']);
    Route::delete('/categories/{id}', [AdminController::class, 'deleteCategory']);
    Route::get('/categories', [AdminController::class, 'getCategories']);

    // Question-related routes
    Route::post('/questions', [AdminController::class, 'createQuestion']);
    Route::put('/questions/{id}', [AdminController::class, 'updateQuestion']);
    Route::delete('/questions/{id}', [AdminController::class, 'deleteQuestion']);
    Route::get('questions', [AdminController::class, 'getQuestions']);
});