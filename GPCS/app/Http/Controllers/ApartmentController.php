<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use App\Models\ApartmentImage;
use App\Models\ClosedPeriod;
use App\Models\Reservation;
use App\Models\Tag;
use Carbon\Carbon;
use FilePaths;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ApartmentController extends Controller
{
    /// <summary>
    /// Get all apartments for manager/admin.
    /// </summary>
    public function managerList()
    {
        $apartments = Apartment::query()
            ->select(['id', 'name', 'postal_code', 'street', 'price', 'image', 'user_id', 'activated'])
            ->latest()
            ->with(['user:id,firstname,lastname'])
            ->with(['tags' => function ($query) {
                $query->select('tags.*');   //pour filtrer si des appartements ont des tag ou non
            }])
            ->with(['images:*'])
            ->get();

        $formattedApartments = $apartments->map(function ($apartment) {
            return $apartment->modelSetter();
        });

        $storagePath = FilePaths::IMAGE_URL;

        return Inertia::render(FilePaths::APARTMENT_TO_VERIFY, [
            'apartments' => $formattedApartments,
            'storagePath' => $storagePath
        ]);
    }

    /// <summary>
    /// Get all apartments.
    /// </summary>
    public function list()
    {
        $apartments = Apartment::query()
            ->select(['id', 'name', 'postal_code', 'street', 'price', 'image', 'user_id'])
            ->latest()
            ->with(['user:id,firstname,lastname'])
            ->with(['tags' => function ($query) {
                $query->select('tags.*');   //pour filtrer si des appartements ont des tag ou non
            }])
            ->with(['images:*'])
            ->where('apartments.activated', true)
            ->get();

        $formattedApartments = $apartments->map(function ($apartment) {
            return $apartment->modelSetter();
        });

        $storagePath = FilePaths::IMAGE_URL;

        return Inertia::render(FilePaths::APARTMENTS, [
            'apartments' => $formattedApartments,
            'storagePath' => $storagePath
        ]);
    }

    public function index()
    {
        $user = Auth::user();
        $appartements = $user->apartments()->with(['images', 'tags'])->get();

        $storagePath = FilePaths::IMAGE_URL;

        return Inertia::render(FilePaths::MY_APARTMENTS, [
            'apartments' => $appartements,
            'storagePath' => $storagePath
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $tags = Tag::all()->where("user_id", Auth()->id());
        return Inertia::render(FilePaths::APARTMENT_CREATION, [
            'tags' => $tags
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validateData = $request->validate([
            'name' => ['required', 'max:255', 'regex:/^[a-zA-Z\s]*$/'],
            'address' => ['required', 'max:255'],
            'surface' => ['required', 'numeric'],
            'guestCount' => ['required', 'numeric'],
            'roomCount' => ['required', 'numeric'],
            'description' => ['required', 'max:255'],
            'price' => ['required', 'numeric'],
            'image' => ['array'],
            'image.*' => ['image'],
            'tag_id' => ['array']
        ]);

        unset($validateData['image']);

        $validateData['user_id'] = Auth()->id();

        $appartement = new Apartment($validateData);

        $appartement->user()->associate($validateData['user_id']);
        $appartement->save();
        if (isset($validateData['tag_id'])) {
            $appartement->tags()->sync($validateData['tag_id']);
        }

        if ($request->hasFile('image')) {
            $images = $request->file('image');

            foreach ($images as $image) {
                $path = $image->store('imagesAppart', 'public');

                $appartementImage = new ApartmentImage();
                $appartementImage->image = $path;
                $appartementImage->apartment_id = $appartement->id;
                $appartementImage->save();
            }
        }


        return redirect()->route('dashboard')
            ->with('success', "Appartement créé avec succès");
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $apartment = Apartment::with(['user:id,firstname,lastname'])->with(['images:*'])->with(['tags:*'])->findOrFail($id);

        $intervalle = Reservation::where("apartment_id", $apartment->id)
            ->select("start_time", "end_time")
            ->get();

        $fermeture = ClosedPeriod::where("apartment_id", $apartment->id)
            ->select("start_time", "end_time")
            ->get();

        // Récupérer les dates déjà réservées pour cet appartement
        $reservedDates = Reservation::where('apartment_id', $apartment->id)
            ->get() // Récupérez toutes les réservations
            ->map(function ($reservation) {
                return [
                    'start' => Carbon::parse($reservation->start_time)->toDateString(),
                    'end' => Carbon::parse($reservation->end_time)->toDateString(),
                ];
            })
            ->toArray();


        $storagePath = FilePaths::IMAGE_URL;
        return Inertia::render(FilePaths::APARTMENT, [
            'apartment' => $apartment->modelSetter(),
            'fermetures' => $fermeture,
            'intervalles' => $intervalle,
            'reservedDates' => $reservedDates,
            'storagePath' => $storagePath
        ]);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $appartement = Apartment::findOrFail($id);
        //        Gate::authorize('update', $appartement);
        $tags = Tag::all()->where("user_id", Auth()->id());
        return Inertia::render('Apartment.edit', [
            'appartement' => $appartement,
            'tags' => $tags
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $appartement = Apartment::findOrFail($id);

        // Gate::authorize('update', $appartement);

        $validatedData = $request->validate([
            'name' => ['required', 'string'],
            'address' => ['required', 'max:255'],
            'surface' => ['required', 'numeric', 'min:0'],
            'guestCount' => ['required', 'numeric', 'min:0'],
            'roomCount' => ['required', 'numeric', 'min:0'],
            'description' => ['required', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'image' => ['array'],
            'image.*' => ['image'],
            'tag_id' => ['array'],
        ]);


        unset($validatedData['image']);

        if ($request->hasFile('image')) {
            $images = $request->file('image');

            $appartementImages = ApartmentImage::where('apartment_id', $appartement->id)->get();

            if ($appartementImages->count() >= 4) {
                return redirect()->route('apartment.edit', $appartement->id)
                    ->with('error', "Il y a déjà 4 images pour votre appartement. Pour en ajouter une nouvelle, veuillez en supprimer une autre.");
            }

            foreach ($images as $image) {
                $path = $image->store('imagesAppart', 'public');

                $appartementImage = new ApartmentImage();
                $appartementImage->image = $path;
                $appartementImage->apartment_id = $appartement->id;
                $appartementImage->save();
            }
        }

        $appartement->update($validatedData);

        if (isset($validatedData['tag_id'])) {
            $appartement->tags()->sync($validatedData['tag_id']);
        } else {
            $appartement->tags()->detach();
        }

        return redirect()->route('apartment.index', $appartement->id)
            ->with('success', "Appartement mis à jour avec succès");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): RedirectResponse
    {
        $apartment = Apartment::findOrFail($id);

        //        Gate::authorize('delete', $apartment);

        $apartment->delete();

        return redirect()->route('apartment.index')->with('message', 'Apartment deleted successfully');
    }

    public function destroyImg($id): RedirectResponse
    {
        $appartementImages = ApartmentImage::findOrFail($id);

        $appartementImages->delete();

        return redirect()->route('apartment.edit', $appartementImages->apartment_id)
            ->with('success', "Appartement mis à jour avec succès");
    }

    public function validate($id){

        $appartement = Apartment::findOrFail($id);

        $appartement->activated = 1;

        $appartement->save();

        return redirect()->route("apartment.managerList")
            ->with('success', "Appartement validé à jour avec succès");
    }
}
