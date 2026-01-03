import { updateUserProfile, getUserById } from "./user.service";

export async function updateProfileController(req: any, res: any) {
  const userId = req.userId;
  const data = req.body;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const user = await updateUserProfile(userId, data);
  res.json(user);
}

export async function getProfileController(req:any,res:any) {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const user = await getUserById(userId);
  res.json(user);
}
