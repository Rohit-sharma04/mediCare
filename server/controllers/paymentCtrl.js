import stripe from 'stripe';
import { bookAppointmnet } from '../lib/BookAppointment.js';
const endpointSecret = process.env.ENDPOINT_SECRET;

export const createCheckoutSessionController = async (req, res) => {
    try {
        const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY);
        const { fees, doctorId, userId, userName,doctorName, date, time ,doctorUserId} = req.body;

        const paymentAmount = fees * 100;

        // Create a checkout session with Stripe
        const session = await stripeClient.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: `Doctor Appointment - ${doctorName}`,
                            description: `Appointment on ${date} at ${time}`
                        },
                        unit_amount: paymentAmount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: process.env.CLIENT_URL + '/paymentSuccess',
            cancel_url: process.env.CLIENT_URL + '/paymentFailed',

            payment_intent_data: {
                metadata: {
                    doctorId,
                    userId,
                    userName,
                    doctorName,
                    date,
                    time,
                    doctorUserId
                }
            }
        });
        console.log("sessionId", session);
        res.json({ session });
        // res.redirect(303, session.url);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating checkout session' });
    }
};

export const handleStripeWebhookEvent=async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.log("error = ", err.message)
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        console.log("paymentIntentSucceeded = ", paymentIntentSucceeded)
        const checkoutSessionData = paymentIntentSucceeded.metadata;
        console.log("data here = ", checkoutSessionData)
        try {
          await bookAppointmnet(checkoutSessionData)
        } catch (error) {
          console.log('Error in booking appointment : ', error)
        }
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    // Return a 200 response to acknowledge receipt of the event
    res.send();
  }
  
