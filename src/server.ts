import { app } from "./app";
import { connectDB } from "./config/db";
import mongoose from "mongoose";

mongoose.set("bufferCommands", false);

async function start() {
  await connectDB();

  app.listen(4000, () => {
    console.log("Server started on port 4000");
  });
}

start().catch(err => {
  console.error("Fatal startup error:", err);
  process.exit(1);
});
