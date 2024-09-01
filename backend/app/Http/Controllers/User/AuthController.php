<?php

namespace App\Http\Controllers\User;

use DB;
use App\Models\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;


class AuthController extends Controller
{
    

    public function Login(Request $request)
{
    try {
        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();

            // Revoke any existing tokens
            $user->tokens()->delete();

            // Create a new token
            $token = $user->createToken('app')->accessToken;

            return response([
                'message' => "Successfully Logged In",
                'token' => $token,
                'user' => $user
            ], 200);
        }
    } catch (\Exception $exception) {
        return response([
            'message' => $exception->getMessage()
        ], 400);
    }

    return response([
        'message' => 'Invalid Email Or Password'
    ], 401);
}


 public function Register(RegisterRequest $request){

        try{

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password) 
            ]);
            $token = $user->createToken('app')->accessToken;

            return response([
                'message' => "Registration Successfull",
                'token' => $token,
                'user' => $user
            ],200);

            }catch(\Exception $exception){
                return response([
                    'message' => $exception->getMessage()
                ],400);
            } 

    }  






}
 