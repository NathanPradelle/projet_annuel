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
        'description'
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function tickeCategory(): BelongsTo {
        return $this->belongsTo(ticket_category::class);
    }

}