<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    use HasFactory;
    //
    protected $fillable = [
        "asset_code",
        "name",
        "description",
        "brand",
        "model",
        "serial_number",
        "manufacturer",
        "is_active",
        "observations",
    ];
}
