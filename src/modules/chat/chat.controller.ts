import { chat } from "./chat.service";

export async function chatController(req : any, res : any) {
  const userId = req.userId;
  const { input } = req.body;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  if (!input) return res.status(400).json({ error: "input required" });

  try {
    const response = await chat({ userId, input });
    res.json({ response });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

