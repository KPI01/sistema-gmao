<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\CreateUserRequest;
use App\Http\Requests\User\ResetPasswordRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $users = User::all();
        return inertia('Resources/User/Index', [
            'users' => $users,
            "can" => [
                "update" => $request->user()->can("update", $users->first()),

            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        //
        if (! $request->user()?->can("create", User::class)) {
            logger()->error("not enough permissions");
            return back()->withErrors(["access" => "No tienes suficientes permisos para realizar esta acción."]);
        }

        return inertia("Resources/User/Create", [
            "users_count" => User::count()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateUserRequest $request)
    {
        if (! $request->user()?->can("create", User::class)) {
            logger()->error("not enough permissions");
            return back()->withErrors(["access" => "No tienes suficientes permisos para realizar estaacción."]);
        }

        $validated = $request->validated();

        $user = User::create([
            "name" => $validated["name"],
            "email" => $validated["email"],
            "username" => $validated["username"],
            "password" => Hash::make($validated["password"]),
        ]);

        return redirect()->route("user.show", $user);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
        return inertia("Resources/User/Show", [
            "user" => $user
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
        return inertia("Resources/User/Edit", [
            "user" => $user
        ]);
    }

    public function resetPassword(ResetPasswordRequest $request, User $user)
    {
        if (! $request->user()?->can("update", $user)) {
            logger()->error("not enough permissions");
            return back()->withErrors(["access" => "No tienes suficientes permisos para realizar esta acción."]);
        }
        logger()->debug("resetting password for user:", $user->toArray());

        $validated = $request->validated();

        if (Hash::check($validated["new_password"], $user->password)) {
            logger()->error("password cannot be the same as the current one");
            return back()->withErrors(["password" => "La nueva contraseña debe ser diferente a la actual."]);
        }
        logger()->debug("password validated");

        $user->update([
            "password" => Hash::make($validated["new_password"])
        ]);

        if ($request->user()->id === $user->id) {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }

        return back()->with("success", "La contraseña se ha actualizado correctamente.");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        //
        logger()->debug("updating user:", $user->toArray());
        if (! $request->user()?->can("update", $user)) {
            logger()->error("not enough permissions");
            return back()->withErrors(["access" => "No tienes suficientes permisos para realizar esta acción."]);
        }

        $validated = $request->validated();
        logger()->debug("form data", $validated);

        $user->update($validated);
        $user->save();
        $user->refresh();

        return to_route("user.index")->with("success", "El usuario se ha actualizado correctamente.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request,User $user)
    {
        //
        if (! $request->user()?->can("delete", $user)) {
            logger()->error("not enough permissions");
            return back()->withErrors(["access" => "No tienes suficientes permisos para realizar esta acción."]);
        }

        $user->delete();

        return to_route("user.index")->with("success", "El usuario se ha eliminado correctamente.");
    }
}
