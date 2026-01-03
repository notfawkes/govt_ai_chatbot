import mongoose from "mongoose";

const ShortTermMessageSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String, enum: ["human", "ai", "system"], required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: false }
);

export const ShortTermMessageModel = mongoose.model("ShortTermMessage", ShortTermMessageSchema);
