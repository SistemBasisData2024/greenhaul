import express from "express";
import * as userController from "../controllers/user.controller.js";

const router = express.Router();

/* === Route for Authentications === */
router.post("/login", userController.userLogin);
router.post("/register", userController.userRegister);

/* === Route for Ordering Waste Pickup Service === */
router.get("/:id/order-sampah", userController.getOrderSampah);
router.post("/order-sampah", userController.createOrderSampah);

export default router;
