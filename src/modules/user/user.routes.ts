import { Router } from "express";
import { updateProfileController, getProfileController } from "./user.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();
router.get("/me", authMiddleware, getProfileController);
router.post("/profile", authMiddleware, updateProfileController);

export default router;
