<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Policies\ApartementPolicy;

class Apartment extends Model
{
    use HasFactory;

    protected $policy = ApartementPolicy::class;

    protected $fillable = [
        'postal_code',
        'street',
        'address',
        'surface',
        'guestCount',
        'roomCount',
        'description',
        'price'
    ];

    protected $hidden = [
        'availabillity'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ApartmentImage::class);
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'apartment_tags');
    }

    public function closedperiodes(): HasMany
    {
        return $this->hasMany(ClosedPeriod::class);
    }

    /// <summary>
    /// Fonction to set user to return
    /// </summary>
    /// <return> a formatted user </return>
    public function modelSetter()
    {
        $apartment = [
            'id' =>  $this?->id,
            'name' => $this?->name,
            'postalCode' =>  $this?->postal_code,
            'street' =>  $this?->street,
            'guestCount' =>  $this?->guestCount,
            'roomCount' =>  $this?->roomCount,
            'description' =>  $this?->description,
            'price' =>  $this?->price,
            'availability' =>  $this?->availability,
            'createdAt' =>  $this?->created_at,
            'updatedAt' =>  $this?->updated_at,
            'activated' =>  $this?->activated,

            'user' => $this?->user,
            'images' => $this?->images->map(function ($image) {
                return [
                    'id' => $image->id,
                    'image' => $image->image
                ];
            })->toArray(),
            'reservations' => $this?->reservations->map(function ($reservation) {
                return ['id' => $reservation->id];
            })->toArray(),
            'tags' => $this?->tags->map(function ($tag) {
                return ['id' => $tag->id];
            })->toArray(),
            'closedPeriodes' => $this?->closedPeriodes->map(function ($closedPeriode) {
                return ['id' => $closedPeriode->id];
            })->toArray(),
        ];

        return array_filter($apartment, function ($value) {
            return !is_null($value);
        });
    }

    /// <summary>
    /// Fonction to set UserVm to User.
    /// </summary>
    /// <return>User.</return>
    public function modelGetter($vm)
    {
        $apartmentData = [
            'id' => isset($vm?->id) ? $vm->id : null,
            'name' => isset($vm?->name) ? $vm->name : null,
            'postal_code' => isset($vm?->postalCode) ? $vm->postalCode : null,
            'street' => isset($vm?->street) ? $vm->street : null,
            'guestCount' => isset($vm?->guestCount) ? $vm->guestCount : null,
            'roomCount' => isset($vm?->roomCount) ? $vm->roomCount : null,
            'description' => isset($vm?->description) ? $vm->description : null,
            'price' => isset($vm?->price) ? $vm->price : null,
            'availability' => isset($vm?->availability) ? $vm->availability : null,
            'created_at' => isset($vm?->createdAt) ? $vm->createdAt : null,
            'updated_at' => isset($vm?->updatedAt) ? $vm->updatedAt : null,
        ];

        $apartment = new Apartment($apartmentData);

        if (isset($vm?->user)) {
            $apartment->user = $vm->user;
        }
        if (isset($vm?->images)) {
            $apartment->images = $vm->images;
        }
        if (isset($vm?->reservations)) {
            $apartment->tags = $vm->reservations;
        }
        if (isset($vm?->tags)) {
            $apartment->tags = $vm->tags;
        }
        if (isset($vm?->closedPeriodes)) {
            $apartment->tags = $vm->closedperiodes;
        }

        return $apartment;
    }
}
