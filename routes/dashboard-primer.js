import express from "express";
import {
    rekap_izin_primer,
} from "../controllers/dshPrimerController.js";
const router = express.Router();

router.get("/rekap-izin-primer", rekap_izin_primer);

export default router; 