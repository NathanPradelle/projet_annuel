<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Http\Controllers\Controller;
use App\Models\Ticket_note;
use FilePaths;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tickets = Ticket::query()
            ->select(['id', 'objet', 'description', 'status', 'ticket_category_id', 'created_at'])
            ->with(['ticketCategory:id,name'])
            ->latest()
            ->paginate(25);

        // Ajoutez le nom de la catégorie à chaque ticket
        $tickets->getCollection()->transform(function ($ticket) {
            $ticket->category_name = $ticket->ticketCategory->name;
            return $ticket;
        });

        return response()->json($tickets);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render(FilePaths::TICKET_CREATION);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validateData = $request->validate([
            'category' => 'required|integer|in:1,2,3,4',
            'subject' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $validateData['user_id'] = Auth()->id();


        $ticket = new Ticket();
        $ticket->user()->associate($validateData['user_id']);
        $ticket->ticket_category_id = $validateData['category'];
        $ticket->objet = $validateData['subject'];
        $ticket->description = $validateData['description'];
        $ticket->save();

        return redirect()->route('tickets.index', $validateData['user_id'])->with('success', 'TicketCreationPage créé avec succès!');
    }
    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $ticket = Ticket::with(['ticketCategory', 'user', 'ticketNotes'])->find($id);

        if (!$ticket) {
            return response()->json(['message' => 'Ticket not found'], 404);
        }

        if (request()->is('api/*')) {
            return response()->json($ticket);
        } else {
            return inertia(FilePaths::TICKET_SHOW, ['ticket' => $ticket]);
        }
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ticket $ticket)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $ticket = Ticket::find($id);
        if (!$ticket) {
            return response()->json(['message' => 'TicketCreationPage not found'], 404);
        }

        $request->validate([
            'status' => 'string|in:new,closed,fixed|nullable',
            'note' => 'nullable|string',
        ]);

        if ($request->filled('status')) {
            $ticket->status = $request->input('status');
            $ticket->save();
        }

        if ($request->filled('note')) {
            Ticket_note::create([
                'ticket_id' => $ticket->id,
                'note' => $request->input('note'),
                'user_id' => $request->input('user_id')
            ]);
        }

        if (request()->is('api/*')) {
            return response()->json($ticket);
        } else {
            return redirect()->route('ticket.show', $id)->with('success', 'Note ajoutée');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $ticket = Ticket::findOrFail($id);
            $ticket->delete();

            return response()->json([
                'message' => 'TicketCreationPage deleted successfully',
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'TicketCreationPage not found',
            ], 404);
        }
    }
    public function contact()
    {
        return Inertia::render(FilePaths::CONTACT);
    }

    public function customerIndex($id){

        $tickets = Ticket::where('user_id', $id)
            ->select(['id', 'objet', 'description', 'status', 'ticket_category_id', 'created_at'])
            ->with(['ticketCategory:id,name'])
            ->latest()
            ->paginate(25);

        $formattedTickets = $tickets->map(function ($ticket) {
            return $ticket->modelSetter();
        });

        return Inertia::render(FilePaths::TICKET_INDEX, [
            'tickets'=>$formattedTickets]);
    }
}
