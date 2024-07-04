<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
        'objet',
        'status',
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class,'user_id');
    }

    public function ticketCategory(): BelongsTo {
        return $this->belongsTo(Ticket_category::class, 'ticket_category_id');
    }

    public function ticketNote(): HasMany {
        return $this->HasMany(Ticket_note::class);
    }

    public function modelSetter()
    {
        $ticket = [
            'id' => $this?->id,
            'ticket_category_id' => $this?->ticket_category_id,
            'objet' => $this?->objet,
            'description' => $this?->description,
            'status' => $this?->status,
            'user_id' => $this?->user_id,
            'createdAt' =>  $this?->created_at,
            'updatedAt' =>  $this?->updated_at,
        ];

        return $ticket;
    }

}
