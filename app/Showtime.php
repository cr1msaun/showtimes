<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Showtime extends Model
{
    protected $fillable = ['hall_id', 'movie_id', 'start_time', 'end_time', 'break', 'format'];

    public function hall() {
        return $this->belongsTo(Hall::class);
    }

    public function movie() {
        return $this->belongsTo(Movie::class);
    }
}
