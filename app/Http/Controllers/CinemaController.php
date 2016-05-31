<?php

namespace App\Http\Controllers;

use App\User;
use App\Hall;
use App\Cinema;
use App\Showtime;
use App\Http\Requests;
use Illuminate\Http\Request;

class CinemaController extends Controller
{
    /**
     * Instantiate a new CinemaController instance.
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $cinema = $request->user()->cinemas()->findOrFail($id);
        $halls = $cinema->halls;

        $dateStart = $request->get('date');

        if (!$dateStart)
            $dateStart = date('Y-m-d');

        $dateEnd = date('Y-m-d', strtotime($dateStart . ' +1 day'));

        foreach ($halls as $hall) {
            $showtimes = $hall->showtimes()
                              ->where([
                                  ['start_time', '>=', $dateStart . ' 05:00'],
                                  ['start_time', '<', $dateEnd . ' 05:00']
                              ])
                              ->orderBy('start_time')
                              ->get();

            foreach ($showtimes as $showtime) {
                $showtime['movie'] = Showtime::find($showtime['id'])->movie;
                $showtime['start_time'] = date('H:i', strtotime($showtime['start_time']));
                $showtime['end_time'] = date('H:i', strtotime($showtime['end_time']));
            }

            $hall['showtimes'] = $showtimes;
        }

        $cinema['halls'] = $halls;

        return response()->json($cinema);
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
}
