<?php

use App\Http\Controllers\CollectionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SnippetController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TrashController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [WelcomeController::class, 'index']);

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
Route::middleware('auth')->group(function () {
    Route::get('/snippets', [SnippetController::class, 'index'])->name('snippets.index');
    Route::get('/snippets/create', [SnippetController::class, 'create'])->name('snippets.create');
    Route::put('/snippets/{snippet}', [SnippetController::class, 'update'])->name('snippets.update');
    Route::delete('/snippets/{snippet}', [SnippetController::class, 'destroy'])->name('snippets.destroy');

    Route::get('/favorites', [FavoriteController::class, 'index'])->name('favorites.index');
    Route::post('/favorites/{snippet}', [FavoriteController::class, 'store'])->name('favorites.store');

    Route::get('/collections', [CollectionController::class, 'index'])->name('collections.index');
    Route::get('/collections/{collection}', [CollectionController::class, 'show'])->name('collections.show');

    Route::get('/tags', [TagController::class, 'index'])->name('tags.index');
    Route::get('/trash', [TrashController::class, 'index'])->name('trash.index');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
