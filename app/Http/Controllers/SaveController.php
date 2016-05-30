<?php

namespace App\Http\Controllers;


use App\Hall;
use App\Movie;
use App\Cinema;
use App\Showtime;

use App\Http\Requests;
use Illuminate\Http\Request;

class SaveController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) //TODO: check for auth
    {
        $data = $request->all();

        foreach ($data['halls'] as $hallId => $showtimes) {
            $hall = Hall::findOrFail($hallId);

            $dateFrom = $data['date'] . ' 05:00';
            $dateTo = date('Y-m-d', strtotime($data['date'] . ' +1 day')) . ' 05:00';

            $hall->showtimes()
                 ->where([
                     ['start_time', '>=', $dateFrom],
                     ['start_time', '<', $dateTo]
                 ])
                 ->delete();

            foreach ($showtimes as $showtime) {
                $hall->showtimes()->create([
                    'movie_id' => $showtime['mId'],
                    'start_time' => $this->getTimestampByTime($showtime['start_time'], $data['date']),
                    'end_time' => $this->getTimestampByTime($showtime['end_time'], $data['date']),
                    'break' => $showtime['break'],
                    'format' => $showtime['format']
                ]);
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }


    private function getTimestampByTime($time, $date) {
        list($hours, $minutes) = explode(':', $time);

        if ($hours >= 0 && $hours < 5)
            return date('Y-m-d', strtotime($date . ' +1 day')) .' '. $time;

        return $date .' '. $time;
    }
}
