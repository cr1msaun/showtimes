<?php

namespace App\Http\Controllers;

use Excel;
use App\Cinema;
use App\Showtime;
use App\Http\Requests;
use Illuminate\Http\Request;

class DownloadController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
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
     * @param Request $request
     * @param $cinemaId
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $cinemaId)
    {
        global $cinema, $date, $dateFrom, $dateTo;

        $date = $request->get('date');

        $dateFrom = $date . ' 05:00';
        $dateTo = date('Y-m-d', strtotime($date . ' +1 day')) . ' 05:00';

        $cinema = Cinema::findOrFail($cinemaId);
        $halls = $cinema->halls;

        foreach ($halls as $hall) {
            $showtimes = $hall->showtimes()
                ->where([
                    ['start_time', '>=', $dateFrom . ' 05:00'],
                    ['start_time', '<', $dateTo . ' 05:00']
                ])
                ->orderBy('start_time')
                ->get();

            foreach ($showtimes as $showtime) {
                $showtime['movie'] = Showtime::findOrFail($showtime['id'])->movie;
                $showtime['start_time'] = date('H:i', strtotime($showtime['start_time']));
                $showtime['end_time'] = date('H:i', strtotime($showtime['end_time']));
            }

            $hall['showtimes'] = $showtimes;
        }

        $cinema['halls'] = $halls;

        $file = Excel::create('Planirovaniye_' . $cinema->name . '_' . $date, function($excel) {

            $excel->sheet('Расписание', function($sheet) {
                global $cinema, $date;

                $sheet->setStyle(array(
                    'font' => array(
                        'name'      =>  'Arial',
                        'size'      =>  14
                    )
                ));

                $sheet->loadView('print', [
                    'cinema' => $cinema,
                    'date' => $date
                ]);
            });

        })->store('xls', storage_path('../public/files'), true);

        return response()->json($file['file']);
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
