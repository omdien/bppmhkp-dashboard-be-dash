// src/scripts/run-dshSKP.service.js
import "dotenv/config";

import {
  getResumeSKP,
  getTrenBulanan,
  getKomposisiPeringkat,
  getKomposisiPermohonan,
  getKomposisiOlahan,
  getDistribusiSkalaUsaha,
  getTopProvinsi,
  getTopKabupaten,
  getTopUPI,
} from "../services/dshSKP.service.js";

/**
 * Helper biar output konsisten
 */
const section = async (title, fn) => {
  console.log(`\n==============================`);
  console.log(`📊 ${title}`);
  console.log(`==============================`);

  const result = await fn();

  if (Array.isArray(result)) {
    console.table(result);
  } else {
    console.log(result);
  }
};

async function run() {
  const startDate = "2025-01-01";
  const endDate = "2025-12-31";

  await section("RESUME SKP", () =>
    getResumeSKP(startDate, endDate)
  );

  await section("TREN BULANAN", () =>
    getTrenBulanan(startDate, endDate)
  );

  await section("KOMPOSISI PERINGKAT", () =>
    getKomposisiPeringkat(startDate, endDate)
  );

  await section("KOMPOSISI PERMOHONAN", () =>
    getKomposisiPermohonan(startDate, endDate)
  );

  await section("KOMPOSISI OLAHAN", () =>
    getKomposisiOlahan(startDate, endDate)
  );

  await section("DISTRIBUSI SKALA USAHA", () =>
    getDistribusiSkalaUsaha(startDate, endDate)
  );

  // ===== TOP DATA (tanpa limit)
  await section("TOP PROVINSI (ALL)", () =>
    getTopProvinsi(startDate, endDate)
  );

  await section("TOP KABUPATEN (ALL)", () =>
    getTopKabupaten(startDate, endDate)
  );

//   await section("TOP UPI (ALL)", () =>
//     getTopUPI(startDate, endDate)
//   );

  // ===== TOP DATA (dengan limit)
  await section("TOP 5 PROVINSI", () =>
    getTopProvinsi(startDate, endDate, 5)
  );

  await section("TOP 10 KABUPATEN", () =>
    getTopKabupaten(startDate, endDate, 10)
  );

  await section("TOP 15 UPI", () =>
    getTopUPI(startDate, endDate, 15)
  );
}

run()
  .catch((err) => {
    console.error("❌ SCRIPT ERROR:", err);
  })
  .finally(() => {
    console.log("\n✅ Script selesai");
    process.exit(0);
  });
