<?php

use App\Http\Controllers\SearchDomainController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', SearchDomainController::class)->name('search');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
