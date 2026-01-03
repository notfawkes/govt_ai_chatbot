import { UserModel } from "../user/user.model";

export async function saveChatSummary(userId: string, summary: string) {
  await UserModel.findByIdAndUpdate(userId, {
    $push: { "longTermMemory.chatSummaries": summary }
  });
}

export async function getChatSummaries(userId: string) {
  const user = await UserModel.findById(userId).lean();
  return user?.longTermMemory?.chatSummaries ?? [];
}
