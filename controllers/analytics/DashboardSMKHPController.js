// controllers/analytics/DashboardSMKHPController.js
import {
  getSummaryData,
  getTrenBulananData,
  getNegaraTujuanData,
  getTopKomoditasData,
  getTopTraderData,
  getRasioEfisiensiData
} from "../../services/analytics/DashboardSMKHPService.js";

import moment from "moment";

import { getDateRange } from "../../utils/dateUtils.js";

// A. Ringkasan Eksekutif
export const getSummary = async (req, res) => {
  try {
    const { kdUpt, tglAwal, tglAkhir } = req.query; // ✅ PAKAI QUERY

    if (!tglAwal || !tglAkhir) {
      return res.status(400).json({ msg: "Parameter tglAwal dan tglAkhir wajib diisi." });
    }

    const data = await getSummaryData(kdUpt, tglAwal, tglAkhir);
    return res.status(200).json(data);
  } catch (error) {
    console.error("getSummary error:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// B. Tren Bulanan
export const getTrenBulanan = async (req, res) => {
  try {
    const { start, end } = getDateRange(req.query);
    const data = await getTrenBulananData(start, end);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal memuat tren bulanan ekspor SMKHP" });
  }
};

// C. Negara Tujuan
export const getNegaraTujuan = async (req, res) => {
  try {
    const { start, end } = getDateRange(req.query);
    const data = await getNegaraTujuanData(start, end);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal memuat data negara tujuan ekspor" });
  }
};

// D. Top Komoditas
export const getTopKomoditas = async (req, res) => {
  try {
    const { start, end } = getDateRange(req.query);
    const limit = Number(req.query.limit) || 10;
    const data = await getTopKomoditasData(start, end, limit);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal memuat top komoditas ekspor" });
  }
};

// E. Top Trader
export const getTopTrader = async (req, res) => {
  try {
    const { start, end } = getDateRange(req.query);
    const limit = Number(req.query.limit) || 10;
    const data = await getTopTraderData(start, end, limit);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal memuat top trader ekspor" });
  }
};

// F. Rasio & Efisiensi
export const getRasioEfisiensi = async (req, res) => {
  try {
    const { start, end } = getDateRange(req.query);
    const data = await getRasioEfisiensiData(start, end);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menghitung rasio efisiensi ekspor" });
  }
};
