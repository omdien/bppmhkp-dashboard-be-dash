import express from "express";
import {
    // rekapIzinPrimer,
    // propinsiPerIzin,
    rekapIzinPrimer2,
    propinsiPerIzin2,
} from "../controllers/dshPrimer.controller.js";

const router = express.Router();

router.get("/rekap-izin-primer", rekapIzinPrimer2);
router.get("/propinsi-per-izin", propinsiPerIzin2);

export default router; 