<?php

use App\Http\Controllers\ScheduleController;
use App\Models\Subject;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('scheduleGrid');
})->name('home');

Route::apiResource('schedules', ScheduleController::class);
Route::get('timeslots', function () {
    return \App\Models\TimeSlot::all()->toJson();
});
Route::get('teachers', function () {
    return \App\Models\Teacher::all()->toJson();
});
Route::get('subjects', function () {
    return \App\Models\Subject::all()->toJson();
});

Route::get('subjects/{id}', function ($id) {
    $subject = Subject::findOrFail($id);
    return $subject->toJson();
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
