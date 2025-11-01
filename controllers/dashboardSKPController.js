// controllers/dashboardSKPController.js
import * as DashboardSKPService from "../services/dashboardSKPService.js";

/**
 * Utility: ambil startDate dan endDate dari query
 */
const getRange = (req) => {
  const { startDate, endDate } = req.query;
  return { startDate, endDate };
};

/**
 * Utility: Template handler untuk semua endpoint
 */
const handleDashboardRequest = async (serviceFn, req, res, label) => {
  try {
    const { startDate, endDate } = getRange(req);
    const data = await serviceFn(startDate, endDate);
    res.json(data); // ✅ hanya data (tanpa success)
  } catch (err) {
    console.error(`${label} error:`, err);
    res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   🔹 1. Resume Utama
   ============================================================ */
export const getResumeSKP = (req, res) =>
  handleDashboardRequest(DashboardSKPService.getResumeSKP, req, res, "getResumeSKP");

/* ============================================================
   🔹 2. Tren Bulanan
   ============================================================ */
export const getTrenBulanan = (req, res) =>
  handleDashboardRequest(DashboardSKPService.getTrenBulanan, req, res, "getTrenBulanan");

/* ============================================================
   🔹 3. Komposisi Peringkat
   ============================================================ */
export const getKomposisiPeringkat = (req, res) =>
  handleDashboardRequest(DashboardSKPService.getKomposisiPeringkat, req, res, "getKomposisiPeringkat");

/* ============================================================
   🔹 4. Komposisi Jenis Permohonan
   ============================================================ */
export const getKomposisiPermohonan = (req, res) =>
  handleDashboardRequest(DashboardSKPService.getKomposisiPermohonan, req, res, "getKomposisiPermohonan");

/* ============================================================
   🔹 5. Komposisi Jenis Olahan
   ============================================================ */
export const getKomposisiOlahan = (req, res) =>
  handleDashboardRequest(DashboardSKPService.getKomposisiOlahan, req, res, "getKomposisiOlahan");

/* ============================================================
   🔹 6. Distribusi Skala Usaha
   ============================================================ */
export const getDistribusiSkalaUsaha = (req, res) =>
  handleDashboardRequest(DashboardSKPService.getDistribusiSkalaUsaha, req, res, "getDistribusiSkalaUsaha");

/* ============================================================
   🔹 7. Top 10 Provinsi
   ============================================================ */
export const getTopProvinsi = (req, res) =>
  handleDashboardRequest(DashboardSKPService.getTopProvinsi, req, res, "getTopProvinsi");

/* ============================================================
   🔹 8. Top 10 Kabupaten
   ============================================================ */
export const getTopKabupaten = (req, res) =>
  handleDashboardRequest(DashboardSKPService.getTopKabupaten, req, res, "getTopKabupaten");

/* ============================================================
   🔹 9. Top 10 UPI
   ============================================================ */
export const getTopUPI = (req, res) =>
  handleDashboardRequest(DashboardSKPService.getTopUPI, req, res, "getTopUPI");
