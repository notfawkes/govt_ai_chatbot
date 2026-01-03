import { UserModel } from "../user/user.model";
import { createShortTermMemory } from "../memory/shortTerm.memory";
import { saveChatSummary } from "../memory/longTerm.memory";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { createChatChain } from "../../langchain/chains";

export async function chat({
  userId,
  input,
}: {
  userId: string;
  input: string;
}) {
  const user = await UserModel.findById(userId).lean();
  if (!user) throw new Error("User not found");

  const memory = createShortTermMemory(userId);

  await memory.addMessage(new HumanMessage(input));

  const chain = createChatChain(memory as any);

  const response: string = await chain.invoke({
    input,
    user_name: user.name ?? "Unknown",
    user_age: user.age ?? "Unknown",
    user_email: user.email ?? "Unknown",
  });

  await memory.addMessage(new AIMessage(response));

  const summaryText = `User: ${input} | AI: ${response}`;
  await saveChatSummary(userId, summaryText);

  return response;
}
