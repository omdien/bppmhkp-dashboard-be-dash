// routes/dashboardSKPRoutes.js
import express from "express";
import * as DashboardSKPController from "../controllers/dashboardSKPController.js";

const router = express.Router();

// 📊 Resume dan Tren
router.get("/resume-skp", DashboardSKPController.getResumeSKP);
router.get("/tren-bulanan", DashboardSKPController.getTrenBulanan);

// 🧩 Komposisi
router.get("/komposisi-peringkat", DashboardSKPController.getKomposisiPeringkat);
router.get("/komposisi-permohonan", DashboardSKPController.getKomposisiPermohonan);
router.get("/komposisi-olahan", DashboardSKPController.getKomposisiOlahan);
router.get("/distribusi-skala", DashboardSKPController.getDistribusiSkalaUsaha);

// 🗺️ Top Provinsi / Kabupaten / UPI
router.get("/top-provinsi", DashboardSKPController.getTopProvinsi);
router.get("/top-kabupaten", DashboardSKPController.getTopKabupaten);
router.get("/top-upi", DashboardSKPController.getTopUPI);

export default router;
