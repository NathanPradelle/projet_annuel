<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ticket_note extends Model
{
    use HasFactory;

    protected $fillable = [
        'note',
        'ticket_id',
    ];

    public function tickets(): BelongsTo {
        return $this->BelongsTo(Ticket::class, 'ticket_id');
    }
}
