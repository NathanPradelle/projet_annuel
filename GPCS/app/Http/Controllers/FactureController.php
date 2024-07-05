<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Facture;
use App\Models\Service;
use App\Models\Reservation;

use Dompdf\Dompdf;


use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class FactureController extends Controller
{
    public function client($id){
        $user = User::find(auth()->id());
        $reservation = Reservation::with('apartment')->where('id',$id)->first(); //join('apartments', 'reservations.apartment_id', '=', 'apartments.id')
        
        $end_date = Carbon::parse($reservation->end_time);
        $start_date = Carbon::parse($reservation->start_time);
        $total_price = $reservation->apartment->price * ($start_date->diffInDays($end_date) + 1);
        //dd($total_price);

        //dd($reservation);
        $pdf = Pdf::loadView('factureclientreservation',compact('user', 'reservation','total_price'));
        return $pdf->stream('invoice.pdf');
        return view('factureclient');
    }
}
