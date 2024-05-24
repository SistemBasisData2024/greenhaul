import express from "express";

import * as userController from "../controllers/user.controller.js";

const router = express.Router();

/* === Route for Authentications === */
router.post("/login", userController.userLogin);
// router.post("/register", userController.);

/* === Route for Ordering Waste Pickup Service === */
// router.get("/order-sampah", userController.);
// router.post("/order-sampah", userController.);

// router.get("/profile", userController.);
// router.post("/profile", userController.);
// router.post("/profile/change-password", userController.);

export default router;
