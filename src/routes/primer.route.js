import express from "express";
import {
    rekapIzinPrimer,
    propinsiPerIzin
} from "../controllers/dshPrimer.controller.js";

const router = express.Router();

router.get("/rekap-izin-primer", rekapIzinPrimer);
router.get("/propinsi-per-izin", propinsiPerIzin);

export default router; 