<?php

namespace App\Models;

use App\Events\Reservation as EventsReservation;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'apartment_id',
        'start_time',
        'end_time',
        'guestCount',
        'price',
        'status',
        'comment',
        'content'
    ];

    protected $dispatchesEvents = [
        'created' => EventsReservation::class,
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function apartment(): BelongsTo
    {
        return $this->belongsTo(Apartment::class, 'apartment_id');
    }

    public function services() : BelongsToMany
    {
        return $this->belongsToMany(Service::class, 'reservation_service_provider', 'reservation_id', 'service_id',);
    }

    public function providers() : BelongsToMany
    {
        return $this->belongsToMany(provider_service::class, 'reservation_service_provider', 'reservation_id', 'provider_id',);
    }

    /// <summary>
    /// Fonction to set user to return
    /// </summary>
    /// <return> a formatted user </return>
    public function modelSetter()
    {
        $reservation = [
            'id' =>  $this?->id,
            "dateStart" => $this?->start_time,
            "dateEnd" => $this?->end_time,
            'guestCount' =>  $this?->guestCount,
            'status' =>  $this?->status,
            'price' =>  $this?->price,
            'comment' =>  $this?->comment,
            'createdAt' =>  $this?->created_at,
            'updatedAt' =>  $this?->updated_at,

            'user' => $this?->user,
            'apartment' => $this?->apartment->modelSetter(),
        ];

        return array_filter($reservation, function ($value) {
            return !is_null($value);
        });
    }

    /// <summary>
    /// Fonction to set UserVm to User.
    /// </summary>
    /// <return>User.</return>
    public function modelGetter($vm)
    {
        $reservationData = [
            'id' => isset($vm?->id) ? $vm->id : null,
            'dateStart' => isset($vm?->dateStart) ? $vm->dateStart : null,
            'dateEnd' => isset($vm?->dateEnd) ? $vm->dateEnd : null,
            'guestCount' => isset($vm?->guestCount) ? $vm->guestCount : null,
            'status' => isset($vm?->status) ? $vm->status : null,
            'price' => isset($vm?->price) ? $vm->price : null,
            'comment' => isset($vm?->comment) ? $vm->comment : null,
            'created_at' => isset($vm?->createdAt) ? $vm->createdAt : null,
            'updated_at' => isset($vm?->updatedAt) ? $vm->updatedAt : null,
        ];

        $reservation = new Apartment($reservationData);

        if (isset($vm?->user)) {
            $reservation->user = $vm->user;
        }
        if (isset($vm?->apartment)) {
            $reservation->apartment = $vm->apartment;
        }

        return $reservation;
    }
}
