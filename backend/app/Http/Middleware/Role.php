<?php

namespace App\Http\Middleware;

use App\Models\SetRole;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Role
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = $request->user();

        $hasRole = SetRole::where('id_user', $user->id)
            ->whereHas('role', function ($query) use ($roles) {
                $query->whereIn('nama_role', $roles);
            })->exists();

        if (!$hasRole) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return $next($request);
    }

}
