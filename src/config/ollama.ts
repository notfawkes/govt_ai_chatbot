export const OLLAMA_CONFIG = {
  apiUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
  model: process.env.OLLAMA_MODEL || "qwen3",
};
