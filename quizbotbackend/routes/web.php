<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\QuestionController;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth')->group(function () {
    //dashboard
    Route::get('dashboard', [AuthController::class, 'dashboard'])->name('dashboard');

    //admin
    Route::group(['middleware' => 'admin_auth'], function () {
        //category
        Route::prefix('category')->group(function () {
            Route::get('list', [CategoryController::class, 'list'])->name('category#list');
            Route::get('create/page', [CategoryController::class, 'createPage'])->name('category#createPage');
            Route::post('create', [CategoryController::class, 'create'])->name('category#create');
            Route::get('delete/{id}', [CategoryController::class, 'delete'])->name('category#delete');
            Route::get('edit/{id}', [CategoryController::class, 'edit'])->name('category#edit');
            Route::post('update', [CategoryController::class, 'update'])->name('category#update');
        });

        //question
        Route::prefix('question')->group(function () {
            Route::get('list', [QuestionController::class, 'list'])->name('question#list');
        });

        //admin account
        Route::get('password/changePage', [AdminController::class, 'changePasswordPage'])->name('admin#changePasswordPage');
        Route::post('change/password', [AdminController::class, 'changePassword'])->name('admin#changePassword');

        //admin list
        Route::get('list', [AdminController::class, 'list'])->name('admin#list');
        Route::get('delete/id', [AdminController::class, 'delete'])->name('admin#delete');
        Route::get('changeRole/id', [AdminController::class, 'changeRole'])->name('admin#changeRole');
        Route::post('change/role/{id}', [AdminController::class, 'change'])->name('admin#change');

        //profile
        Route::get('details', [AdminController::class, 'details'])->name('admin#details');
        Route::get('edit', [AdminController::class, 'edit'])->name('admin#edit');
        Route::post('update/{id}', [AdminController::class, 'update'])->name('admin#update');
    });
});

//login,register
Route::middleware(['admin_auth'])->group(function () {
    Route::redirect('/', 'loginPage');
    Route::get('loginPage', [AuthController::class, 'loginPage'])->name('auth#loginPage');
    Route::get('registerPage', [AuthController::class, 'registerPage'])->name('auth#registerPage');
});


Route::view('/test', 'test');
