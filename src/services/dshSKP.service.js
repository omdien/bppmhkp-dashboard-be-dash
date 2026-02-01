import * as Repo from "../repositories/skp.repository.js";

/* ============================================================
   1. Resume
   ============================================================ */
export const getResumeSKP = async (startDate, endDate) => {
  return Repo.countResume(startDate, endDate);
};

/* ============================================================
   2. Tren Bulanan
   ============================================================ */
export const getTrenBulanan = async (startDate, endDate) => {
  const raw = await Repo.trenBulanan(startDate, endDate);

  return Array.from({ length: 12 }, (_, i) => {
    const bulan = i + 1;
    const found = raw.find((r) => r.bulan === bulan);
    return { bulan, jumlah: found ? parseInt(found.jumlah) : 0 };
  });
};

/* ============================================================
   3–6. Komposisi
   ============================================================ */
export const getKomposisiPeringkat = (s, e) =>
  Repo.groupCount("peringkat", s, e);

export const getKomposisiPermohonan = (s, e) =>
  Repo.groupCount("jenis_permohonan", s, e);

export const getKomposisiOlahan = (s, e) =>
  Repo.groupCount("jenis_olahan", s, e);

export const getDistribusiSkalaUsaha = (s, e) =>
  Repo.groupCount("skala_usaha", s, e);

/* ============================================================
   7–9. Top Data
   ============================================================ */
export const getTopProvinsi = (s, e, limit) =>
  Repo.groupCount("provinsi", s, e, limit);

export const getTopKabupaten = (s, e, limit) =>
  Repo.groupCount("kota_kabupaten", s, e, limit);

export const getTopUPI = (s, e, limit) =>
  Repo.groupCount("nib", s, e, limit);
