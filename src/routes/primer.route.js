import express from "express";
// import {
    // rekap_izin_primer,
    // propinsi_per_izin
// } from "../controllers/dshPrimerController.js";

import {
    rekapIzinPrimer,
    propinsiPerIzin
} from "../controllers/dshPrimer.controller.js";

const router = express.Router();

router.get("/rekap-izin-primer", rekapIzinPrimer);
router.get("/propinsi-per-izin", propinsiPerIzin);

export default router; 