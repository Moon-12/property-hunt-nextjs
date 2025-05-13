import User from "@/models/User";
import mongoose from "mongoose";
import Message from "@/models/Message";
let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  // If the database is already connected, don't connect again
  if (connected) {
    //console.log("MongoDB is connected...");
    return;
  }

  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    //console.log("MongoDB connected...");
  } catch (error) {
    //console.log(error);
  }
};

export default connectDB;
