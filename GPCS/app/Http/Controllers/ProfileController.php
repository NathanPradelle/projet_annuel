<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Profile;
use FilePaths;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    #region Get

    /// <summary>
    /// Get all profiles.
    /// </summary>
    public function get()
    {
        $profiles = Profile::query()
            ->select('profiles.id', 'profiles.name')
            ->whereIn('profiles.id', [1, 2, 3, 4])
            ->get();

        return response()->json($profiles);
    }

    /// <summary>
    /// Get profiles of a users.
    /// </summary>
    public function getForUser($userId)
    {
        $profiles = Profile::query()
            ->select('profile.id', 'profile.name')
            ->leftJoin('user_profile', 'profile.id', '=', 'user_profile.profile')
            ->leftJoin('users', 'users.id', '=', 'user_profile.user')
            ->where('users.id', $userId)
            ->get();

        return response()->json($profiles);
    }

    #endregion

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render(FilePaths::PROFILE, [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
