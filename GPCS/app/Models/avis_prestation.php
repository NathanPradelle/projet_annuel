<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class avis_prestation extends Model
{
    use HasFactory;
    
    public function prestation()
    {
        return $this->belongsTo(Prestation::class);
    }
}
