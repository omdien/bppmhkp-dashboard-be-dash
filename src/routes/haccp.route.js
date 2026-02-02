// src/routes/haccp.route.js
import express from "express";
import {
  getHACCPPerPropinsiPerGrade,
  getHaccpPerBulan,
  getHaccpPerTahun,
} from "../controllers/dshHACCP.controller.js";

const router = express.Router();

/**
 * Dashboard HACCP
 * GET /api/dashboard/haccp/propinsi-grade
 * Query:
 *  - startDate (YYYY-MM-DD) [required]
 *  - endDate   (YYYY-MM-DD) [required]
 *  - limit     (number | optional)
 */
router.get("/propinsi-grade", getHACCPPerPropinsiPerGrade);
router.get("/haccp-per-bulan",getHaccpPerBulan);
router.get("/haccp-per-tahun",getHaccpPerTahun);

export default router;
