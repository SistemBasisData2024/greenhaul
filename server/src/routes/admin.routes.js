import express from "express";

import * as adminController from "../controllers/admin.controller.js";

const router = express.Router();

/* === Route for ... === */
router.post("/login", adminController.adminLogin);
// router.post("/register", adminController.adminRegister);

// router.get("/order-sampah", adminController.getAllOrderSampah);
// router.post("/order-sampah/:id", adminController.changeOrderSampahById);
// router.post("/order-sampah/konversi", adminController.konversiSampahToCoin);

// router.get("/order-produk", adminController.getAllOrderProduk);
// router.get("/order-produk/:id", adminController.getOrderProdukById);
// router.post("/order-produk/:id", adminController.changeOrderProdukById);

// router.get("/produk", adminController.getAllProduk);
// router.get("/produk/:id", adminController.getProdukById);
// router.post("/produk/:id", adminController.changeProdukById);

export default router;
