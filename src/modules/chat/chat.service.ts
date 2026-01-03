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
  // 1. Fetch user (long-term profile)
  const user = await UserModel.findById(userId).lean();
  if (!user) throw new Error("User not found");

  // 2. Short-term memory (Mongo-backed)
  const memory = createShortTermMemory(userId);

  // 3. Store human message
  await memory.addMessage(new HumanMessage(input));

  // 4. Run the LangChain conversational flow
  const chain = createChatChain(memory as any);

  const response: string = await chain.invoke({
    input,
    user_name: user.name ?? "Unknown",
    user_age: user.age ?? "Unknown",
    user_email: user.email ?? "Unknown",
  });

  // 5. Store AI message in short-term memory
  await memory.addMessage(new AIMessage(response));

  // 6. Persist a short summary to long-term memory
  const summaryText = `User: ${input} | AI: ${response}`;
  await saveChatSummary(userId, summaryText);

  return response;
}
