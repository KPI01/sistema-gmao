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
        $userSample = User::first();
        $incidenceSample = Incidence::first();

        return [
            ...parent::share($request),
            "auth" => [
                "user" => $request->user(),
                "can" => [
                    "see" => [
                        "incidence" => $request->user()?->can("view", $incidenceSample),
                        "user" => $request->user()?->can("view", $userSample),
                    ],
                    "create" => [
                        "incidence" => $request->user()?->can("create", $incidenceSample),
                        "user" => $request->user()?->can("create", $userSample)
                    ],
                    "update"=>[
                        "incidence" => $request->user()?->can("update", $incidenceSample),
                        "user" => $request->user()?->can("update", $userSample)
                    ],
                    "delete" => [
                        "incidence" => $request->user()?->can("delete", $incidenceSample),
                        "user" => $request->user()?->can("delete", $userSample)
                    ]
                ]
            ],
        ];
    }
}
