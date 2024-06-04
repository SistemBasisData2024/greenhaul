import express from "express";

import * as adminController from "../controllers/admin.controller.js";
import { requireAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

/* === Route for ... === */
router.post("/login", adminController.adminLogin);

router.use(requireAdmin);

router.get("/*", requireAdmin, adminController.isAuthorized);

router.post("/register", adminController.adminRegister);

router.post("/logout", adminController.adminLogout);

router.get("/order-sampah", adminController.getAllOrderSampah);
router.get("/order-sampah/:id", adminController.getOrderSampahById);
router.post("/order-sampah/:id", adminController.changeOrderSampahById);
router.post("/order-sampah/konversi", adminController.konversiSampahToCoin);

router.get("/order-produk", adminController.getAllOrderProduk);
router.get("/order-produk/:id", adminController.getOrderProdukById);
router.post("/order-produk/:id", adminController.changeOrderProdukById);

router.get("/produk", adminController.getAllProduk);
router.post("/produk", adminController.createProduk);
router.get("/produk/:id", adminController.getProdukById);
router.post("/produk/:id", adminController.changeProdukById);

export default router;
