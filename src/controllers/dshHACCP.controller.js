// src/controllers/dshHACCP.controller.js
import * as HACCPService from "../services/dshHACCP.service.js";

/**
 * Utility: ambil range tanggal dari query
 */
const getRange = (req) => {
  const { startDate, endDate } = req.query;
  return { startDate, endDate };
};

/**
 * Utility: ambil limit dari query (opsional)
 */
const getLimit = (req) => {
  const { limit } = req.query;
  const parsed = parseInt(limit, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
};

/**
 * Template handler (konsisten dengan dashboard lain)
 */
const handleRequest = async (serviceFn, req, res, label) => {
  try {
    const { startDate, endDate } = getRange(req);
    const limit = getLimit(req);

    const data = await serviceFn({
      startDate,
      endDate,
      limit,
    });

    // ⚠️ hanya data, tanpa success flag
    res.json(data);
  } catch (err) {
    console.error(`${label} error:`, err.message);
    res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   🔹 HACCP per Propinsi per Grade
   ============================================================ */
export const getHACCPPerPropinsiPerGrade = (req, res) =>
  handleRequest(
    HACCPService.getHACCPPerPropinsiPerGrade,
    req,
    res,
    "getHACCPPerPropinsiPerGrade"
  );

// controllers/dshHACCP.controller.js
export const getHaccpPerBulan = async (req, res) => {
  try {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    if (!startDate || !endDate) {
      return res.status(400).json({
        message: "startDate dan endDate wajib diisi (YYYY-MM-DD)",
      });
    }

    const data = await HACCPService.getHaccpPerBulan(
      startDate,
      endDate
    );

    res.json({
      startDate,
      endDate,
      data,
    });
  } catch (error) {
    console.error("getHaccpPerBulan error:", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};


