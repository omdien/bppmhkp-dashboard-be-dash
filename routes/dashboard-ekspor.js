import express from "express";
import { getSummaryEkspor, getEksporHarian,getEksporBulanan } from "../controllers/dshEksporContoller.js";
const router = express.Router();

router.get("/ekspor/summary/:kdUpt/:tglAwal/:tglAkhir", getSummaryEkspor);
router.get("/ekspor/harian/:kdUpt/:tglAwal/:tglAkhir", getEksporHarian);
router.get("/ekspor/bulanan/:kdUpt/:tglAwal/:tglAkhir", getEksporBulanan);

export default router;