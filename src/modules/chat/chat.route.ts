import { Router } from "express";
import { chatController } from "./chat.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();
router.post("/", authMiddleware, chatController);
export default router;
