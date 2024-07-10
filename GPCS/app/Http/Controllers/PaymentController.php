<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use FilePaths;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function createPaymentIntent(Request $request)
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        $paymentIntent = PaymentIntent::create([
            'amount' => 1000, // montant en cents (10.00 USD)
            'currency' => 'usd',
        ]);

        return redirect()->route("reservation.store");
    }

    public function show()
    {

        return Inertia::render(FilePaths::PAYMENT);
    }
}

