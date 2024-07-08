<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class reservation_service extends Model
{
    protected $table = "reservation_service_provider";

    protected $fillable = [
        'reservation_id',
        'service_id',
    ];

}
