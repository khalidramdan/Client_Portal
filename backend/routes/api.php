<?php

use App\Http\Controllers\Api\TourController;
use Corcel\Model\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/users', function () {
        $users = User::get();
        return response()->json(['users' => $users]);
    });
    Route::get('/tours',[TourController::class,'index'])->name('tours');
});

// Route::get('/test',function (){
//     return DB::connection('wordpress')->table('s2a_dev_transfers')->get();

// });


