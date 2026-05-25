import express from "express";
import { getSummaryEkspor, getEksporHarian,getEksporBulanan } from "../controllers/dshEkspor.controller.js";
const router = express.Router();

router.get("/summary/:kdUpt/:tglAwal/:tglAkhir", getSummaryEkspor);
router.get("/harian/:kdUpt/:tglAwal/:tglAkhir", getEksporHarian);
router.get("/bulanan/:kdUpt/:tglAwal/:tglAkhir", getEksporBulanan);

export default router;