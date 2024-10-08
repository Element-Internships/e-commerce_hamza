<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProductReview;

class ReviewController extends Controller
{
    public function ReviewList(Request $request) {
        $product_code = $request->product_code;
        $result = ProductReview::where('product_name', $product_code)
            ->orderBy('id', 'desc')
            ->limit(4)
            ->get();
        return response()->json($result); // Ensure to return a JSON response
    }


    public function PostReview(Request $request){

        $product_name = $request->input('product_name');
       
        $user_name = $request->input('reviewer_name');
        $reviewer_photo = $request->input('reviewer_photo');
        $reviewer_rating = $request->input('reviewer_rating');
        $reviewer_comments = $request->input('reviewer_comments');
         
         $result = ProductReview::insert([
            'product_name' => $product_name,
           
            'reviewer_name' => $user_name,
            'reviewer_photo' => $reviewer_photo,
            'reviewer_rating' => $reviewer_rating,
            'reviewer_comments' => $reviewer_comments,

         ]);
         return $result;

    } 


    public function GetAllReview(){

         $review = ProductReview::latest()->get();
        return view('backend.review.review_all', compact('review'));
    }


} 
 