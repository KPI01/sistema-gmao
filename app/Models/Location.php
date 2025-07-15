<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    //
    protected $fillable = [
        'name',
        'description',
        'code',
        'location_type',
        'is_active',
        'parent_id',
    ];

    public function parent()
    {
        return $this->belongsTo(Location::class, 'parent_id');
    }
}
