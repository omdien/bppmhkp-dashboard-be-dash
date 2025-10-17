import express from "express";
import {
    rekap_izin_primer,
    propinsi_per_izin
} from "../controllers/dshPrimerController.js";
const router = express.Router();

router.get("/rekap-izin-primer", rekap_izin_primer);
router.get("/propinsi-per-izin", propinsi_per_izin);

export default router; 