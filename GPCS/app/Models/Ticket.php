<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
        'objet',
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class,'user_id');
    }

    public function ticketCategory(): BelongsTo {
        return $this->belongsTo(ticket_category::class, 'ticket_category_id');
    }

}
