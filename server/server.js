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
import { bookAppointmnet } from "./lib/BookAppointment.js";

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
  try {
    const { headers } = socket.request;
    const cookies = headers.cookie;
    console.log(cookies)
    const tokenCookieString = cookies?.split(';').find(str => str.trim().startsWith('token='));
    const token = tokenCookieString?.split('=')[1].trim();
    const payload = JSON.parse(Buffer.from(token?.split('.')[1], 'base64').toString());
    console.log("payload", payload)
    console.log(payload?.id)
    socket.userId = payload?.id;
    socket.username = payload?.userName;

  } catch (error) {
    console.log(error)
  }
  finally {
    return next()
  }
})

io.on("connection", (socket) => {
  console.log(`user ${socket.id} Connected to socket.io`)

  socket.on("room:joined", (data) => {
    const { callerId, receiverId } = data;
    console.log("room joined ")
    io.to(callerId).emit("user:joined", {id: socket.id });
    socket.join(callerId);
    const AllSockets = Array.from(io.sockets.sockets)
    AllSockets.forEach(([id, ReceiverSocket]) => {
      console.log("inside for loop",ReceiverSocket.userId,receiverId)
        //insure only caller's event is listened by servers
        if (ReceiverSocket.userId === receiverId && callerId===socket.userId) {
            // socket.emit("receiver details", { reciverSocketId: ReceiverSocket.id, reciverUsername: ReceiverSocket.username })
            // console.log("check ids ", socket.userId, ReceiverSocket.userId, " receiver id = ", receiverId)
            // io.to(room).emit("user:joined", { email, id: socket.id });
            // socket.join(room);
            console.log("calling doctor")
            ReceiverSocket.emit("calling", { callerName: socket.username, callerId: socket.userId, receiverId })
            socket.emit("you are caller",socket.userId)
            // ReceiverSocket.emit("setStream", { callerName: socket.username, callerId: socket.userId, receiverId })
        }
    })
})
socket.on("receiver:joinedRoom",(data)=>{
    const { callerId, receiverId } = data;
    console.log("data = ",data)
    const AllSockets = Array.from(io.sockets.sockets)
    AllSockets.forEach(([id, CallerSocket]) => {
        console.log("check ids ", CallerSocket.userId, "caller id = ",callerId, " receiver id = ", receiverId)
        if (CallerSocket.userId === callerId) {
            console.log("docter  Joined the room ")

            CallerSocket.emit("receiver:joinedRoom")
        }
    })
})

socket.on("user:call", ({ to, offer }) => {
    console.log("--------------user:call-----------------")
    io.to(to).emit("incomming:call", { from: socket.id, offer });
});
socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
});


socket.on("peer:nego:needed", ({ to, offer }) => {
    // console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
});

socket.on("peer:nego:done", ({ to, ans }) => {
    // console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
});
})

//middlewares
app.use(moragan("dev"));

const endpointSecret = process.env.ENDPOINT_SECRET;

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
