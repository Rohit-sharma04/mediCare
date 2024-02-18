import express from "express";
import colors from "colors";
import moragan from "morgan";
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from "./config/db.js";
import userRoute from './routes/userRoutes.js'
import adminRoute from './routes/adminRoutes.js'
import doctorRoute from './routes/doctorRoutes.js'
import paymentRoute from './routes/paymentRoutes.js'
import { configCloudinary } from "./config/cloudinary.js";
import { nodeMailerConfig } from "./config/email.js";
import schedule from "node-schedule"
import { ScheduleAppointments } from "./lib/ScheduleAppointments.js";
import Stripe from "stripe";
import { createServer } from "http";
import { Server } from "socket.io";

const job = schedule.scheduleJob('0 0 1 * *', function () {
  ScheduleAppointments()
  console.log('Task is running on the 1st day of every month!');
});
//dotenv conig 
dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//mongodb connection
await connectDB(); 

//cloudinary config 
configCloudinary()

//node mailer config
nodeMailerConfig()

//rest obejct 
const app = express();
const httpServer = createServer(app);
                                       
//cors
app.use(cors({
  origin: [process.env.CLIENT_URL]
}))

//socket.io
const io = new Server(httpServer, {
  cors: {
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST"],
    credentials: true,
  },
});
io.use((socket, next) => {
  // const { headers } = socket.request;
  // const cookies = headers.cookie;
  // console.log(cookies)
  // const tokenCookieString = cookies?.split(';').find(str => str.trim().startsWith('token='));
  // const token = tokenCookieString?.split('=')[1].trim();
  // const payload = JSON.parse(Buffer.from(token?.split('.')[1], 'base64').toString());
  // console.log("payload",payload)
  // console.log(payload?.id)
  // socket.Id=payload?.id;
  // socket.username=payload?.userName;
  return next()
})

io.on("connection", (socket) => {
  console.log(`user ${socket.id} Connected to socket.io`)
})

//middlewares

// app.use(express.raw({ type: 'application/json' }));
app.use(moragan("dev"));

const endpointSecret = process.env.ENDPOINT_SECRET;
// express.raw({ type: 'application/json' })
// app.use(express.raw({ type: 'application/json'})),
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
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
      // const paymentIntentSucceeded = event.data.object;
      // const checkoutSessionId = paymentIntentSucceeded.payment_intent;
      // const checkoutSession = await stripe.checkout.sessions.retrieve(checkoutSessionId);

      const paymentIntentSucceeded = event.data.object;
      console.log("paymentIntentSucceeded = ", paymentIntentSucceeded)
      // Retrieve Checkout session ID from Payment Intent's metadata
      const checkoutSessionId = paymentIntentSucceeded.metadata.checkout_session_id;
      console.log("-------------------------")
      console.log("data here = ", checkoutSessionId)
      console.log("-------------------------")
      // Use the retrieved Checkout session ID to retrieve the session
      // const checkoutSession = await stripe.checkout.sessions.retrieve(checkoutSessionId);
      console.log("payment is done, book the appointment")
      console.log("-------------------------")
      // console.log("event = ",checkoutSession.metadata)
      console.log("-------------------------")
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
}
);

app.use(express.json({ limit: '50mb' }));
//routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/doctor", doctorRoute);
app.use("/api/v1/stripe", paymentRoute);

//port
const port = process.env.PORT || 8080;
//listen port
httpServer.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});
