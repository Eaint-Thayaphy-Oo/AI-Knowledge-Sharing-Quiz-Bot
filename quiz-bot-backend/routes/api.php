<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GameController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Protected routes
Route::middleware('auth:api')->group(function () {
    // Game-related routes
    Route::post('create-room', [GameController::class, 'createRoom']);
    Route::post('join-room', [GameController::class, 'joinRoom']);
    Route::post('submit-answer', [GameController::class, 'submitAnswer']);
    Route::get('questions', [GameController::class, 'getQuestions']);
    Route::get('scores', [GameController::class, 'getScores']);

    // Admin-related routes
    Route::post('/categories', [AdminController::class, 'createCategory']);
    Route::put('/categories/{id}', [AdminController::class, 'updateCategory']);
    Route::delete('/categories/{id}', [AdminController::class, 'deleteCategory']);
    Route::get('/categories', [AdminController::class, 'getCategories']);
});
