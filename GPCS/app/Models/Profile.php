<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{    
    public function userProfiles() {
        return $this->hasMany(UserProfile::class, 'profile', 'id');
    }

    public function userProfileInUse() {
        return $this->hasOne(User::class, 'profile_in_use', 'id');
    }

    /// <summary>
    /// Fonction to set profile to return
    /// </summary>
    /// <return> a formatted profile </return>
    public function formatProfile(Profile $profile)
    {
        $profile = [
            'id' => $profile?->id,
            'label' => $profile?->label,
        ];

        return $profile;
    }
}
