<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function get_users(Request $request){
        $get_paginate = $request->get('pageSize',10);

        $users = User::orderBy('created_at', 'desc' )->paginate($get_paginate);

        return response()->json([
           "data" =>  $users->items(),
           'total' => $users->total()
        ]);
    }

    public function tambah_user(Request $request){
        $request->validate([
            'email' => 'required|email|unique:users,email',
            'name' => 'required|string'
        ]);

        // $data =
    }
}
