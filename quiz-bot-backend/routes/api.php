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
