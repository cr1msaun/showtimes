<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cinema extends Model
{
    protected $fillable = ['user_id', 'name', 'city'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function halls()
    {
        return $this->hasMany(Hall::class);
    }
}
