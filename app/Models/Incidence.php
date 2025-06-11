<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;

class Incidence extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'creator_id',
        'assigned_to_id',
        'origin',
        'notifier',
        'description',
        'priority',
        'observations',
        'is_validated',
        'validated_at',
        'is_closed',
        'closed_at'
    ];

    protected $hidden = [
        'creator_id',
        'assigned_to_id'
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to_id');
    }

}
