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
// import { initializeSocket } from "./SocketLogic.js";
import { handleStripeWebhookEvent } from "./controllers/paymentCtrl.js";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";

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

app.use(cookieParser())

//cors
app.use(cors({
  origin: [process.env.CLIENT_URL]
}))

// Initialize socket.io
// initializeSocket(httpServer);
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
      console.log("cookies",cookies)
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
      io.to(callerId).emit("user:joined", { id: socket.id });
      socket.join(callerId);
      const AllSockets = Array.from(io.sockets.sockets)
      AllSockets.forEach(([id, ReceiverSocket]) => {
          console.log("inside for loop", ReceiverSocket.userId, receiverId)
          //insure only caller's event is listened by servers
          if (ReceiverSocket.userId === receiverId && callerId === socket.userId) {

              console.log("calling doctor")
              ReceiverSocket.emit("calling", { callerName: socket.username, callerId: socket.userId, receiverId })
              socket.emit("you are caller", socket.userId)

          }
      })
  })
  socket.on("receiver:joinedRoom", (data) => {
      const { callerId, receiverId } = data;
      console.log("data = ", data)
      const AllSockets = Array.from(io.sockets.sockets)
      AllSockets.forEach(([id, CallerSocket]) => {
          console.log("check ids ", CallerSocket.userId, "caller id = ", callerId, " receiver id = ", receiverId)
          if (CallerSocket.userId === callerId) {
              console.log("docter  Joined the room ")
              CallerSocket.emit("receiver:joinedRoom")
          }
      })
  })

  socket.on("user:call", ({ to, offer }) => {
      io.to(to).emit("incomming:call", { from: socket.id, offer });
  });
  socket.on("call:accepted", ({ to, ans }) => {
      io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
      io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
      io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
})

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
