import { UserModel } from "./user.model";

export async function updateUserProfile(userId: string, data: { name?: string; age?: number; occupation?: string; }) {
  await UserModel.findByIdAndUpdate(userId, { $set: data });
  return UserModel.findById(userId).lean();
}

export async function getUserById(userId: string) {
  return UserModel.findById(userId).lean();
}
