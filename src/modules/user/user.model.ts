import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    googleId: { type: String, unique: true },
    email: String,
    name: String,
    age: Number,
    occupation: String,

    longTermMemory: {
      profileSummary: String,
      chatSummaries: [String]
    }
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);
