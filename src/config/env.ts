import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGO_URI!,
  jwtSecret: process.env.JWT_SECRET!,
  ollamaBaseUrl: process.env.OLLAMA_BASE_URL!,
  ollamaModel: process.env.OLLAMA_MODEL!
};
