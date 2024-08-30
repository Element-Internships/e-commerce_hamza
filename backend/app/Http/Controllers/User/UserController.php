<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
     public function User(){

        return Auth::user();
    } 



    public function update(Request $request) {
        $user = Auth::user();
    
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
        ]);
    
       
        $user->name = $validatedData['name'];
        $user->email = $validatedData['email'];
        $user->save();
    
        // Return a success response with the updated user data
        return response()->json(['message' => 'Profile updated successfully.', 'user' => $user]);
    }
    
}
