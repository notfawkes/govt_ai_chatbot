import { RunnableSequence } from "@langchain/core/runnables";
import { chatPrompt } from "./prompts";
import { llm } from "./llm";
import { AIMessage } from "@langchain/core/messages";

export function createChatChain(memory: any) {
  return RunnableSequence.from([
    async (input: {
      input: string;
      user_name: string;
      user_age: number | string;
      user_email: string;
    }) => {
      const history = await memory.getMessages();

      return {
        input: input.input,
        user_name: input.user_name, 
        user_age: input.user_age,    
        user_email: input.user_email,
        chat_history: history,
      };
    },

    chatPrompt,
    llm,

    async (output) => {
      await memory.addMessage(new AIMessage(output.content));
      return output.content;
    },
  ]);
}
