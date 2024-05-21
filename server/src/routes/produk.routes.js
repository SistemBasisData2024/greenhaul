import express from "express";

import * as produkController from "../controllers/produk.controller.js";

const router = express.Router();

/* === Route for ... === */
router.get("/", produkController.getProduct);
// router.get("/:id", userController.);
// router.post("/:id", produkController.);

export default router;
