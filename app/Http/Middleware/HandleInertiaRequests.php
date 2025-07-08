<?php

namespace App\Http\Middleware;

use App\Models\Incidence;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            "auth" => [
                "user" => $request->user(),
                "can" => [
                    "see" => [
                        "incidence" => $request->user()?->can("view", Incidence::first()),
                        "user" => $request->user()?->can("view", User::first()),
                    ],
                    "create" => [
                        "incidence" => $request->user()?->can("create", Incidence::first())
                    ],
                    "update"=>[
                        "incidence" => $request->user()?->can("update", Incidence::first()),
                        "user" => $request->user()?->can("update", User::first())
                    ],
                    "delete" => [
                        "incidence" => $request->user()?->can("delete", Incidence::first()),
                        "user" => $request->user()?->can("delete", User::first())
                    ]
                ]
            ],
        ];
    }
}
