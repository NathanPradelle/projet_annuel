<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
    */
    protected $fillable = [
        'name',
        'email',
        'password',
        'profile_in_use'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
    */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
    */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function apartments(): HasMany {
        return $this->hasMany(Apartment::class);
    }

    public function reservations(): HasMany {
        return $this->hasMany(Reservation::class);
    }

    public function tags():HasMany {
        return $this->hasMany(Tag::class);
    }
    public function tickets():HasMany {
        return $this->hasMany(Ticket::class);
    }

    public function userProfiles() {
        return $this->hasMany(UserProfile::class, 'user', 'id');
    }

    public function profileInUse() {
        return $this->belongsTo(Profile::class, 'profile_in_use', 'id');
    }

    public function ticketNotes(): HasMany{
        return $this->HasMany(Ticket_note::class);
    }

    /// <summary>
    /// Fonction to set user to return
    /// </summary>
    /// <return> a formatted user </return>
    public function modelSetter()
    {
        $user = [
            'id' => $this?->id,
            'name' => $this?->name,
            'email' => $this?->email,
            'profiles' => $this?->userProfiles->map(function ($userProfile) {
                return ['id' => $userProfile->profile];
            })->toArray(),
            'profileInUse' => $this?->profile_in_use,
        ];

        return $user;
    }

    /// <summary>
    /// Fonction to set UserVm to User.
    /// </summary>
    /// <return>User.</return>
    public function modelGetter($vm)
    {
        $userData = [
            'id' => isset($vm?->id) ? $vm->id : null,
            'name' => isset($vm?->name) ? $vm->name : null,
            'email' => isset($vm?->email) ? $vm->email : null,
            'email_verified_at' => isset($vm?->emailVerifiedAt) ? $vm->emailVerifiedAt : null,
            'password' => isset($vm?->password) ? $vm->password : null,
            'remember_token' => isset($vm?->rememberToken) ? $vm->rememberToken : null,
            'created_at' => isset($vm?->createdAt) ? $vm->createdAt : null,
            'updated_at' => isset($vm?->updatedAt) ? $vm->updatedAt : null,
            'profile_in_use' => isset($vm?->profileInUse) ? $vm->profileInUse : null,
        ];

        $user = new User($userData);

        // if (isset($vm?->profiles)) {
        //     $user->userProfiles = $vm->profiles;
        // }

        return $user;
    }
}
