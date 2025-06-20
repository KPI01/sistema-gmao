<?php

use App\Http\Controllers\IncidenceController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {

    Route::resource('incidence', IncidenceController::class)
        ->only(['index', 'show', 'edit']);

});