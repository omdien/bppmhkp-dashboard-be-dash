// controllers/dashboardSKPController.js
import * as DashboardSKPService from "../services/dshSKP.service.js";

/**
 * Utility: ambil startDate dan endDate dari query
 */
const getRange = (req) => {
  const { startDate, endDate } = req.query;
  return { startDate, endDate };
};

/**
 * Utility: ambil limit dari query (opsional)
 * - jika tidak ada / invalid → undefined
 */
const getLimit = (req) => {
  const { limit } = req.query;
  const parsed = parseInt(limit, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
};

/**
 * Utility: Template handler (tanpa limit)
 */
const handleDashboardRequest = async (serviceFn, req, res, label) => {
  try {
    const { startDate, endDate } = getRange(req);
    const data = await serviceFn(startDate, endDate);
    res.json(data);
  } catch (err) {
    console.error(`${label} error:`, err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * Utility: Template handler (dengan limit opsional)
 */
const handleDashboardRequestWithLimit = async (serviceFn, req, res, label) => {
  try {
    const { startDate, endDate } = getRange(req);
    const limit = getLimit(req); // ← di sini bedanya
    const data = await serviceFn(startDate, endDate, limit);
    res.json(data);
  } catch (err) {
    console.error(`${label} error:`, err);
    res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   🔹 1. Resume Utama
   ============================================================ */
export const getResumeSKP = (req, res) =>
  handleDashboardRequest(
    DashboardSKPService.getResumeSKP,
    req,
    res,
    "getResumeSKP"
  );

/* ============================================================
   🔹 2. Tren Bulanan
   ============================================================ */
export const getTrenBulanan = (req, res) =>
  handleDashboardRequest(
    DashboardSKPService.getTrenBulanan,
    req,
    res,
    "getTrenBulanan"
  );

/* ============================================================
   🔹 3. Komposisi Peringkat
   ============================================================ */
export const getKomposisiPeringkat = (req, res) =>
  handleDashboardRequest(
    DashboardSKPService.getKomposisiPeringkat,
    req,
    res,
    "getKomposisiPeringkat"
  );

/* ============================================================
   🔹 4. Komposisi Jenis Permohonan
   ============================================================ */
export const getKomposisiPermohonan = (req, res) =>
  handleDashboardRequest(
    DashboardSKPService.getKomposisiPermohonan,
    req,
    res,
    "getKomposisiPermohonan"
  );

/* ============================================================
   🔹 5. Komposisi Jenis Olahan
   ============================================================ */
export const getKomposisiOlahan = (req, res) =>
  handleDashboardRequest(
    DashboardSKPService.getKomposisiOlahan,
    req,
    res,
    "getKomposisiOlahan"
  );

/* ============================================================
   🔹 6. Distribusi Skala Usaha
   ============================================================ */
export const getDistribusiSkalaUsaha = (req, res) =>
  handleDashboardRequest(
    DashboardSKPService.getDistribusiSkalaUsaha,
    req,
    res,
    "getDistribusiSkalaUsaha"
  );

/* ============================================================
   🔹 7. Top Provinsi (limit opsional)
   ============================================================ */
export const getTopProvinsi = (req, res) =>
  handleDashboardRequestWithLimit(
    DashboardSKPService.getTopProvinsi,
    req,
    res,
    "getTopProvinsi"
  );

/* ============================================================
   🔹 8. Top Kabupaten (limit opsional)
   ============================================================ */
export const getTopKabupaten = (req, res) =>
  handleDashboardRequestWithLimit(
    DashboardSKPService.getTopKabupaten,
    req,
    res,
    "getTopKabupaten"
  );

/* ============================================================
   🔹 9. Top UPI (limit opsional)
   ============================================================ */
export const getTopUPI = (req, res) =>
  handleDashboardRequestWithLimit(
    DashboardSKPService.getTopUPI,
    req,
    res,
    "getTopUPI"
  );

/* ============================================================
   🔹 10. Geo Spatial Data
   ============================================================ */
export const getGeoSKP = (req, res) =>
  handleDashboardRequest(
    DashboardSKPService.getGeoSKP,
    req,
    res,
    "getGeoSKP"
  );
