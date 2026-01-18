import express from "express";
import {
  getSummary,
  getTrenBulanan,
  getNegaraTujuan,
  getTopKomoditas,
  getTopTrader,
  getRasioEfisiensi
} from "../../controllers/analytics/DashboardSMKHPController.js";

const router = express.Router();

router.get("/summary", getSummary);
router.get("/tren-bulanan", getTrenBulanan);
router.get("/negara-tujuan", getNegaraTujuan);
router.get("/top-komoditas", getTopKomoditas);
router.get("/top-trader", getTopTrader);
router.get("/rasio-efisiensi", getRasioEfisiensi);

export default router;
