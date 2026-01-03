import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { OLLAMA_CONFIG } from "../config/ollama";

export const llm = new ChatOllama({
  model: OLLAMA_CONFIG.model,
  baseUrl: OLLAMA_CONFIG.apiUrl,
  temperature: 0.7
});
