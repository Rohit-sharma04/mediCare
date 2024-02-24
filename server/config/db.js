import mongoose from "mongoose";

const connectDB = async () => {
  try {                                    
    // const conn = await mongoose.connect()
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongodb connected ${mongoose.connection.host}:${mongoose.connection.port}`.bgGreen.white);
  } catch (error) {
    console.log(`Mongodb Server Issue ${error}`.bgRed.white);
  }
};

export default connectDB;
