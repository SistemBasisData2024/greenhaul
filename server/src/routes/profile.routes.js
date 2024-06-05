import express from "express";
import * as profileController from "../controllers/profile.controller.js";

const router = express.Router();

router.get("/:user_id", profileController.getUserProfile);
router.post("/:user_id", profileController.updateUserProfile);
router.post("/:user_id/change-password", profileController.changeUserPassword);

export default router;