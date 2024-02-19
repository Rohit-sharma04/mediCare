import stripe from 'stripe';

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
