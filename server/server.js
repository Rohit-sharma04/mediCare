import express from "express";
import colors from "colors";
import moragan from "morgan";
import  dotenv from 'dotenv'
import cors from 'cors'
import connectDB from "./config/db.js";
import userRoute from './routes/userRoutes.js'
import adminRoute from './routes/adminRoutes.js'
import doctorRoute from './routes/doctorRoutes.js'
import { configCloudinary } from "./config/cloudinary.js";
import { nodeMailerConfig } from "./config/email.js";
//dotenv conig
dotenv.config()
 
//mongodb connection
await connectDB();

//cloudinary config
configCloudinary()

//node mailer config
nodeMailerConfig()

//rest obejct 
const app = express();

//cors
app.use(cors({
  origin:'http://localhost:5173'
}))

//middlewares
app.use(express.json());
app.use(moragan("dev"));

//routes
app.use("/api/v1/user",userRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/doctor", doctorRoute);

//port
const port = process.env.PORT || 8080;
//listen port
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white 
  );
});
 