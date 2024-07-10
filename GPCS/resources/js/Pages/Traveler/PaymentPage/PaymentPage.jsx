import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Charger Stripe avec la clé publique en mode test
const stripePromise = loadStripe('pk_test_51Pb667RpePcSneXb4ZQFp7IbJSaawrUf2YFDIG3NjG7CyLS0g9iD09fhzbyhSeDlNjrMUdIbLDLEgenJqkmlBWqr005e1s6HKf');

const CheckoutForm = ({infoReservation}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentSucceeded, setPaymentSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        // Appel à l'API pour créer un PaymentIntent avec Inertia
        Inertia.post(route("payment.createIntent"), {infoReservation}, {
            onSuccess: async (page) => {
                const clientSecret = page.props.clientSecret;

                // Confirmation du paiement avec Stripe
                const result = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardElement),
                    },
                });

                if (result.error) {
                    setError(result.error.message);
                } else {
                    if (result.paymentIntent.status === 'succeeded') {
                        setPaymentSucceeded(true);
                    }
                }
            },
            onError: (errors) => {
                setError("Erreur lors de la création du PaymentIntent");
            }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>Payer</button>
            {error && <div>{error}</div>}
            {paymentSucceeded && <div>Paiement réussi!</div>}
        </form>
    );
};

const PaymentPage = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default PaymentPage;
