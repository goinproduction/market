<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(Request $request)
    {
        try {
            User::create([
                'full_name' => $request->input('full_name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'username' => $request->input('username'),
                'gender' => $request->input('gender'),
                'identity_number' => $request->input('identity_number'),
                'date_of_birth' => $request->input('date_of_birth'),
                'phone' => $request->input('phone'),
                'address' => $request->input('address'),
                'road_name' => $request->input('road_name'),
                'apartment_number' => $request->input('apartment_number'),
                'front_identity' => $request->input('front_identity'),
                'behind_identity' => $request->input('behind_identity'),
            ]);

            return response()->json([
                'message' => 'Success'
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 400,
                'message' => $th->errorInfo[2]
            ], 400);
        }
    }

    // public function login(Request $request)
    // {
    // }
}