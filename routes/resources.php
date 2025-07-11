<?php

use App\Http\Controllers\AssetController;
use App\Http\Controllers\IncidenceController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {

    Route::resource("user", UserController::class);

    Route::resource('incidence', IncidenceController::class);
    Route::put('incidence/{incidence}/validate', [IncidenceController::class, 'validateIncidence'])
        ->name('incidence.validate');
    Route::patch('incidence/{incidence}/validate', [IncidenceController::class, 'validateIncidence'])
        ->name('incidence.validate');
    Route::put('incidence/{incidence}/close', [IncidenceController::class, 'closeIncidence'])
        ->name('incidence.close');
    Route::patch('incidence/{incidence}/validate', [IncidenceController::class, 'closeIncidence'])
        ->name('incidence.close');

    Route::resource("asset", AssetController::class);
});
