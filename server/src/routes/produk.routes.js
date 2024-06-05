import express from "express";
import * as produkController from "../controllers/produk.controller.js";

const router = express.Router();

/* === Route for Product === */
router.get("/", produkController.getProductList);
router.get("/:id", produkController.getProductDetail);
router.post("/:id", produkController.orderProduct);

export default router;