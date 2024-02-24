import express from "express";
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
import { initializeSocket } from "./SocketLogic.js";
import { handleStripeWebhookEvent } from "./controllers/paymentCtrl.js";

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

// Initialize socket.io
initializeSocket(httpServer);

//middlewares
app.use(moragan("dev"));


app.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhookEvent);

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
