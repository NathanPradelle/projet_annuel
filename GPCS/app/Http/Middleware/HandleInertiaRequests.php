<?php

namespace App\Http\Middleware;

use App\Http\Controllers\UserController;
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
    public function version(Request $request): string|null
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
        $userController = new UserController();
        $user = $userController->getForMiddleware();

        return [
            ...parent::share($request),
            'flash' => function () use ($request) {
                return [
                    'message' => $request->session()->get('message')
                ];
            },
            'auth' => [
                'currentUser' => $user,
            ],
        ];
    }
}
