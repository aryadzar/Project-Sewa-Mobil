<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\SetRole;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function customerLogin(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Check if the user is a customer
        $role = SetRole::where('id_user', $user->id)->whereHas('role', function ($query) {
            $query->where('id_role', User::$UUID_CUST);
        })->exists();

        if (!$role) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $token = $user->createToken('customer_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user,
        ]);
    }

    public function customerSignUp(Request $request){
        $credentials = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed|min:8',
            'address' => 'nullable|string',
        ]);

        $credentials['password'] = bcrypt($credentials['password']);

        $new_user = User::create($credentials);

        SetRole::create([
            'id_user' => $new_user->id,
            "id_role" => User::$UUID_CUST,
            'id_actor' => $new_user->id
        ]);

        return response()->json([
            'user' => $new_user
        ]);
    }
    public function adminLogin(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Username atau Passowrd salah'], 401);
        }

        // Check if the user is an admin
        $role = SetRole::where('id_user', $user->id)->whereHas('role', function ($query) {
            $query->where('id_role', User::$UUID_ADMIN);
        })->exists();

        if (!$role) {
            return response()->json(['message' => 'Unauthorized Access'], 403);
        }

        $token = $user->createToken('admin_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user,
        ]);
    }

    public function cek_token(Request $request){
        if ($request->user()) {
            return response()->json([
                'valid' => true,
                'message' => 'Token is valid',
                'user' => $request->user(), // Detail user
            ]);
        }

        return response()->json([
            'valid' => false,
            'message' => 'Invalid token or unauthorized',
        ], 401);
    }

    public function logout(Request $request)
    {
        // Hapus token yang sedang digunakan
        $request->user()->currentAccessToken()->update([
            'expires_at' => now(), // Tandai token expired
        ]);

        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }


}
