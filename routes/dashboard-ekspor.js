import express from "express";
import { getSummaryEkspor } from "../controllers/dshEksporContoller.js";
const router = express.Router();

router.get("/ekspor/summary/:kdUpt/:tglAwal/:tglAkhir", getSummaryEkspor);

export default router;