<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Hall extends Model
{
    protected $fillable = ['cinema_id', 'name', 'seats_count'];

    public function user()
    {
        return $this->belongsTo(Cinema::class);
    }

    public function showtimes()
    {
        return $this->hasMany(Showtime::class);
    }
}
