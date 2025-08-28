<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Corcel\Model\Post;

class TourController extends Controller
{
    //
    public function index(){
        $tours = Post::where('post_type','tours')->status('publish')->get();
        return response()->json($tours);
    }
    public function getTourById($id){
        $tour = Post::where('ID',$id)->where('post_type','tours')->status('publish')->get();
        return response()->json($tour);
    }
}
