<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\SetRole;
use Illuminate\Support\Facades\Hash;

    /**
    * @OA\Info(
    *      version="1.0.0",
    *      title="Dokumentasi API",
    *      description="Lorem Ipsum",
    *      @OA\Contact(
    *          email="hi.wasissubekti02@gmail.com"
    *      ),
    *      @OA\License(
    *          name="Apache 2.0",
    *          url="http://www.apache.org/licenses/LICENSE-2.0.html"
    *      )
    * )
    *
    * @OA\Server(
    *      url=L5_SWAGGER_CONST_HOST,
    *      description="Demo API Server"
    * )
    */

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
        /**
    *    @OA\Post(
    *       path="/admin/login",
    *       tags={"Akses Admin"},
    *       operationId="Login Admin",
    *       summary="Login Admin",
    *       description="Authentikasi Admin",
    *     @OA\Parameter(
     *          email="sdds@dsads.com",
     *          password="1234567",
     *          required=true,
     *          in="query",
     *          @OA\Schema(
     *              type="string"
     *          )
     *     ),
    *       @OA\Response(
    *           response="200",
    *           description="Ok",
    *           @OA\JsonContent
    *           (example={
    *               "success": true,
    *               "message": "Berhasil Login Admin",
    *               "token": "fdsfdsffhdrfgertgfg",
    *               "user": {
    *                   {
    *                   "id": "1",
    *                   "name": "Pendidikan",
    *                   "address": "Bandar lampung",
    *                  }
    *              }
    *          }),
    *      ),
    *  )
    */
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
