import mongoose from "mongoose";
import { env } from "./env";

export async function connectDB() {
  if (!env.mongoUri) {
    throw new Error("MONGO_URI not defined in .env");
  }

  // Prevent double connections
  if (mongoose.connection.readyState === 1) {
    return;
  }

  mongoose.set("bufferCommands", false);

  await mongoose.connect(env.mongoUri, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 20000,
  });

  console.log("MongoDB connected");
}
