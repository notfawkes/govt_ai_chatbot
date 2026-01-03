import { ShortTermMessageModel } from "./shortTerm.model";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

export function createShortTermMemory(userId: string) {
  return {
    async addMessage(message: any) {
      // message is a LangChain message instance (HumanMessage/AIMessage/SystemMessage)
      const role = message.constructor?.name === "AIMessage" ? "ai" : message.constructor?.name === "SystemMessage" ? "system" : "human";
      const content = message.content ?? String(message);
      await ShortTermMessageModel.create({ userId, role, content });
    },

    async getMessages() {
      const docs = await ShortTermMessageModel.find({ userId }).sort({ createdAt: 1 }).lean();
      return docs.map((d) => (d.role === "ai" ? new AIMessage(d.content) : new HumanMessage(d.content)));
    },

    async clear() {
      await ShortTermMessageModel.deleteMany({ userId });
    },
  };
} 
