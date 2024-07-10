<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use App\Models\ClosedPeriod;
use App\Models\Reservation;
use App\Models\Service;
use App\Models\reservation_service;
use FilePaths;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ReservationController extends Controller
{
    /**
     * Display the list of user's reservation.
     */
    public function index()
    {
        $reservations = Reservation::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        $pagination = [
            'current_page' => $reservations->currentPage(),
            'first_page_url' => $reservations->url(1),
            'from' => $reservations->firstItem(),
            'last_page' => $reservations->lastPage(),
            'last_page_url' => $reservations->url($reservations->lastPage()),
            'links' => $reservations->linkCollection(),
            'next_page_url' => $reservations->nextPageUrl(),
            'path' => $reservations->path(),
            'per_page' => $reservations->perPage(),
            'prev_page_url' => $reservations->previousPageUrl(),
            'to' => $reservations->lastItem(),
            'total' => $reservations->total(),
        ];

        $formattedReservations = $reservations->map(function ($reservation) {
            return $reservation->modelSetter();
        });

        // Passer les réservations à la vue
        return Inertia::render(FilePaths::MY_RESERVATIONS, [
            'reservations' => $formattedReservations,
            'pagination' => $pagination
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {

        $apartment_id = $request->route('apartment_id');

        $selectedAppartement = Apartment::find($apartment_id);
        $appartements = Apartment::all();
        $prixAppartement = $selectedAppartement->prix;

        $intervalle = Reservation::where("apartment_id", $apartment_id)
            ->select("start_time", "end_time")
            ->get();

        $fermeture = ClosedPeriod::where("apartment_id", $apartment_id)
            ->select("start_time", "end_time")
            ->get();

        return Inertia::render('Reservation.create', [
            'fermetures' => $fermeture,
            'appartements' => $appartements,
            'selectedAppartement' => $selectedAppartement,
            'apartment_id' => $apartment_id,
            'prixAppartement' => $prixAppartement,
            'intervalles' => $intervalle,
        ]);
    }

    public function test(Request $request)
    {
        dd($request);
    }

    /// <summary>
    /// Fonction to create a new reservation
    /// </summary>
    /// <params> apartmentVm </params>
    /// <return> reservation page with a reservationVm </return>
    public function store(Request $request)
    {
        Log::info('Reservation Data from session:');
        // Récupérer les informations de réservation de la session
        $reservationData = $request->session()->get('reservation');
        $serviceIds = $request->session()->get('serviceIds', []);

        if (!$reservationData) {
            return redirect()->route('reservation.create')->with('error', 'Aucune réservation trouvée.');
        }

        $services = [];
        foreach ($serviceIds as $serviceId) {
            $service = Service::find($serviceId);
            if ($service) {
                $services[] = $service;
            }
        }

        $user = $request->user();

        $reservation = new Reservation([
            'user_id' => $user->id,
            'apartment_id' => $reservationData['id'],
            'start_time' => $reservationData['dateStart'],
            'end_time' => $reservationData['dateEnd'],
            'guestCount' => $reservationData['guestCount'],
            'price' => $reservationData['price'],
        ]);

        $conflictingReservation = Reservation::where('apartment_id', $reservation['apartment_id'])
            ->where(function ($query) use ($reservation) {
                $query->whereBetween('start_time', [$reservation['start_time'], $reservation['end_time']])
                    ->orWhereBetween('end_time', [$reservation['start_time'], $reservation['end_time']])
                    ->orWhere(function ($query) use ($reservation) {
                        $query->where('start_time', '<=', $reservation['start_time'])
                            ->where('end_time', '>=', $reservation['end_time']);
                    });
            })
            ->exists();

        if ($conflictingReservation) {
            return redirect()->route('appart.show', $reservation['apartment_id'])->with('error', "Les dates choisies ne sont pas disponibles. Veuillez choisir d'autres dates.");
        }

        $reservation->save();

        foreach ($services as $service) {
            $relation = new reservation_service([
                'reservation_id' => $reservation->id,
                'service_id' => $service->id,
            ]);
            $relation->save();
        }

        // Supprimer les informations de réservation de la session
        $request->session()->forget(['reservation', 'serviceIds']);

        return redirect()->route('reservation.index')->with('success', "Réservation bien prise en compte");
    }



    public function saveInformations(Request $request)
    {
        // Valider les données de la réservation
        $validatedData = $request->validate([
            'id' => ['required', 'exists:apartments,id'],
            'dateStart' => ['required', 'date', 'after_or_equal:today'],
            'dateEnd' => ['required', 'date', 'after:dateStart'],
            'guestCount' => ['required', 'numeric'],
            'price' => ['required', 'numeric'],
        ]);

        // Stocker les informations de la réservation dans la session
        $request->session()->put('reservation', $validatedData);

        $serviceIds = [];
        $servicefilter = collect($request->all())->filter(function ($value, $key) {
            return Str::startsWith($key, 'service-');
        })->all();

        foreach ($servicefilter as $key => $value) {
            $parts = explode('-', $key);
            $serviceIds[] = end($parts);
        }

        $request->session()->put('serviceIds', $serviceIds);

        // Rediriger vers la page de paiement
        return redirect()->route('payment.show');
    }



    public function manage()
    {
        $reservations = Reservation::with(['user', 'apartment', 'services', 'providers'])->get();

        return Inertia::render(FilePaths::RESERVATION_MANAGEMENT, ['reservations' => $reservations]);
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $reservation = Reservation::findOrFail($id);

        return Inertia::render(FilePaths::MY_RESERVATION, ['reservation' => $reservation]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $reservation = Reservation::findOrFail($id);

        return view('Reservation.edit', ['reservation' => $reservation]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $validatedData = $request->validate([
            'start_time' => ['required', 'date', 'after_or_equal:today'],
            'end_time' => ['required', 'date', 'after:start_date'],
            'guestCount' => ['required', 'numeric'],
            'price' => ['required', 'numeric'],
        ]);


        $reservation = Reservation::findOrFail($id);

        $reservation->start_time = $validatedData['start_time'];
        $reservation->end_time = $validatedData['end_time'];
        $reservation->nombre_de_personne = $validatedData['guestCount'];
        $reservation->prix = $validatedData['price'];
        $reservation->save();


        return redirect()->route('reservations.show', ['reservation' => $reservation->id])
            ->with('success', 'Reservation updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {

        $reservation = Reservation::findOrFail($id);

        $reservation->delete();

        return redirect()->route('reservation.index')
            ->with('success', 'Reservation annulée');
    }

    public function validate($id)
    {
        Reservation::where('id', $id)->update(['status' => 'Validé']);

        return redirect()->back()
            ->with('success', 'La reservation a été validée avec succès');
    }

    public function refused($id)
    {
        Reservation::where('id', $id)->update(['status' => 'Refusé']);

        return redirect()->back()
            ->with('success', 'La reservation a été refusée avec succès');
    }


    public function showAll($apartment_id)
    {
        $reservations = Reservation::where('apartment_id', $apartment_id)
            ->latest('created_at')
            ->paginate(15);

        $appartement_name = Apartment::findOrFail($apartment_id)->name;

        return view('Reservation.showAll', compact('reservations', 'appartement_name'));
    }
}
