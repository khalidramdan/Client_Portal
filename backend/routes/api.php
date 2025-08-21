<?php

use Corcel\Model\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/users', function () {
        $users = User::get();
        return response()->json(['users' => $users]);
    });
});


