import { ChatPromptTemplate } from "@langchain/core/prompts";

export const chatPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `
You are a helpful AI assistant.

User profile:
- Name: {user_name}
- Age: {user_age}
- Email: {user_email}

Incorporate the user's profile information into your responses to provide a personalized experience.


Use this information when relevant.
Keep responses concise and accurate.
    `.trim(),
  ],
  ["placeholder", "{chat_history}"],
  ["human", "{input}"],
]);
