// services/dashboardSKPService.js
import { Op, Sequelize } from "sequelize";
import TbSkpPaska from "../models/skp/tb_skp_paska.js";

/* ============================================================
   🔹 Helper untuk Range Periode
   ============================================================ */
const buildWhere = (startDate, endDate) => {
  const now = new Date();
  const year = now.getFullYear();

  const rangeStart = startDate ? new Date(startDate) : new Date(`${year}-01-01`);
  const rangeEnd = endDate ? new Date(endDate) : new Date(`${year}-12-31`);

  return {
    tanggal_terbit: {
      [Op.between]: [rangeStart, rangeEnd],
    },
  };
};

/* ============================================================
   🔹 1. Resume SKP (Sertifikat, UPI, Provinsi, Kabupaten)
   ============================================================ */
export const getResumeSKP = async (startDate, endDate) => {
  const where = buildWhere(startDate, endDate);

  const sertifikat = await TbSkpPaska.count({ where });
  const upi = await TbSkpPaska.count({ distinct: true, col: "nib", where });
  const provinsi = await TbSkpPaska.count({ distinct: true, col: "provinsi_id", where });
  const kabupaten = await TbSkpPaska.count({ distinct: true, col: "regency_id", where });

  return { sertifikat, upi, provinsi, kabupaten };
};

/* ============================================================
   🔹 2. Tren Sertifikat per Bulan (Jan–Des)
   ============================================================ */
export const getTrenBulanan = async (startDate, endDate) => {
  const where = buildWhere(startDate, endDate);

  const result = await TbSkpPaska.findAll({
    attributes: [
      [Sequelize.fn("MONTH", Sequelize.col("tanggal_terbit")), "bulan"],
      [Sequelize.fn("COUNT", Sequelize.col("id")), "jumlah"],
    ],
    where,
    group: [Sequelize.fn("MONTH", Sequelize.col("tanggal_terbit"))],
    order: [[Sequelize.fn("MONTH", Sequelize.col("tanggal_terbit")), "ASC"]],
    raw: true,
  });

  // Pastikan 12 bulan selalu muncul
  const data = Array.from({ length: 12 }, (_, i) => {
    const bulan = i + 1;
    const found = result.find((r) => r.bulan === bulan);
    return { bulan, jumlah: found ? parseInt(found.jumlah) : 0 };
  });

  return data;
};

/* ============================================================
   🔹 3. Komposisi Peringkat SKP (A, B, C, dll)
   ============================================================ */
export const getKomposisiPeringkat = async (startDate, endDate) => {
  const where = buildWhere(startDate, endDate);

  const result = await TbSkpPaska.findAll({
    attributes: [
      "peringkat",
      [Sequelize.fn("COUNT", Sequelize.col("id")), "jumlah"],
    ],
    where,
    group: ["peringkat"],
    raw: true,
  });

  return result.map((r) => ({
    peringkat: r.peringkat || "Tidak Ada",
    jumlah: parseInt(r.jumlah),
  }));
};

/* ============================================================
   🔹 4. Komposisi Jenis Permohonan (Baru, Perpanjangan)
   ============================================================ */
export const getKomposisiPermohonan = async (startDate, endDate) => {
  const where = buildWhere(startDate, endDate);

  const result = await TbSkpPaska.findAll({
    attributes: [
      "jenis_permohonan",
      [Sequelize.fn("COUNT", Sequelize.col("id")), "jumlah"],
    ],
    where,
    group: ["jenis_permohonan"],
    raw: true,
  });

  return result.map((r) => ({
    jenis_permohonan: r.jenis_permohonan || "Tidak Diketahui",
    jumlah: parseInt(r.jumlah),
  }));
};

/* ============================================================
   🔹 5. Komposisi Jenis Olahan
   ============================================================ */
export const getKomposisiOlahan = async (startDate, endDate) => {
  const where = buildWhere(startDate, endDate);

  const result = await TbSkpPaska.findAll({
    attributes: [
      "jenis_olahan",
      [Sequelize.fn("COUNT", Sequelize.col("id")), "jumlah"],
    ],
    where,
    group: ["jenis_olahan"],
    order: [[Sequelize.literal("jumlah"), "DESC"]],
    raw: true,
  });

  return result.map((r) => ({
    jenis_olahan: r.jenis_olahan || "Tidak Diketahui",
    jumlah: parseInt(r.jumlah),
  }));
};

/* ============================================================
   🔹 6. Distribusi Skala Usaha (jika kolom skala_usaha diisi)
   ============================================================ */
export const getDistribusiSkalaUsaha = async (startDate, endDate) => {
  const where = buildWhere(startDate, endDate);

  const result = await TbSkpPaska.findAll({
    attributes: [
      "skala_usaha",
      [Sequelize.fn("COUNT", Sequelize.col("id")), "jumlah"],
    ],
    where,
    group: ["skala_usaha"],
    raw: true,
  });

  return result.map((r) => ({
    skala_usaha: r.skala_usaha || "Tidak Diketahui",
    jumlah: parseInt(r.jumlah),
  }));
};

/* ============================================================
   🔹 7. Top 10 Provinsi dengan SKP Terbanyak
   ============================================================ */
export const getTopProvinsi = async (startDate, endDate, limit = 10) => {
  const where = buildWhere(startDate, endDate);

  const result = await TbSkpPaska.findAll({
    attributes: [
      "provinsi",
      [Sequelize.fn("COUNT", Sequelize.col("id")), "jumlah"],
    ],
    where,
    group: ["provinsi"],
    order: [[Sequelize.literal("jumlah"), "DESC"]],
    limit,
    raw: true,
  });

  return result.map((r) => ({
    provinsi: r.provinsi || "Tidak Diketahui",
    jumlah: parseInt(r.jumlah),
  }));
};

/* ============================================================
   🔹 8. Top 10 Kabupaten dengan SKP Terbanyak
   ============================================================ */
export const getTopKabupaten = async (startDate, endDate, limit = 10) => {
  const where = buildWhere(startDate, endDate);

  const result = await TbSkpPaska.findAll({
    attributes: [
      "kota_kabupaten",
      [Sequelize.fn("COUNT", Sequelize.col("id")), "jumlah"],
    ],
    where,
    group: ["kota_kabupaten"],
    order: [[Sequelize.literal("jumlah"), "DESC"]],
    limit,
    raw: true,
  });

  return result.map((r) => ({
    kota_kabupaten: r.kota_kabupaten || "Tidak Diketahui",
    jumlah: parseInt(r.jumlah),
  }));
};

/* ============================================================
   🔹 9. Top 10 UPI dengan SKP Terbanyak (berdasarkan NIB)
   ============================================================ */
export const getTopUPI = async (startDate, endDate, limit = 10) => {
  const where = buildWhere(startDate, endDate);

  const result = await TbSkpPaska.findAll({
    attributes: [
      "nib",
      "nama_upi",
      [Sequelize.fn("COUNT", Sequelize.col("id")), "jumlah"],
    ],
    where,
    group: ["nib", "nama_upi"],
    order: [[Sequelize.literal("jumlah"), "DESC"]],
    limit,
    raw: true,
  });

  return result.map((r) => ({
    nib: r.nib || "-",
    nama_upi: r.nama_upi || "Tidak Diketahui",
    jumlah: parseInt(r.jumlah),
  }));
};
