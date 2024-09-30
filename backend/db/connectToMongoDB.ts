import mongoose from "mongoose";
import env from "../config/env";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(env.MONGO_DB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", (error as Error).message);
  }
};

export default connectToMongoDB;
