<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function get_users(Request $request){
        $get_paginate = $request->get('pageSize',10);
        $query = $request->get('q');
        $users = User::query()
        ->when($query, function ($get) use ($query) {
            $get->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                  ->orWhere('email', 'like', "%{$query}%")
                  ->orWhere('address', 'like', "%{$query}%");
            });
        })
        ->orderBy('created_at', 'desc' )
        ->paginate($get_paginate);

        return response()->json([
           "data" =>  $users->items(),
           'total' => $users->total()
        ]);
    }

        public function tambah_user(Request $request){
        $data = $request->validate([
            'email' => 'required|email|unique:users,email',
            'name' => 'required|string',
            'address' => "required"
        ], [
            "email.unique" => "Email telah Digunakan"
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'address' => $data['address'],
            'password' => bcrypt('password')
        ]);

        $user->save();

        return response()->json([
            "data" => $user
        ]);

        // $data =
    }

    public function get_detail_user(User $user){
        return response()->json([
            "data" => $user
        ]);
    }
}
