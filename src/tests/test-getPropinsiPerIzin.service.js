import "dotenv/config";
import { getPropinsiPerIzin } from "../services/dshPrimer.service.js";

async function runTest() {
  console.log("===== TEST getPropinsiPerIzin =====");

  const startDate = "2025-01-01";
  const endDate = "2025-12-31";

  /* ===============================
   * TEST 1: OSS (bukan izin kapal)
   * =============================== */
  console.log("\n--- TEST OSS (CPIB) ---");
  const ossResult = await getPropinsiPerIzin({
    startDate,
    endDate,
    kdIzin: "032000000034", // CPIB
    limit: 5,
  });

  console.table(ossResult);

  /* ===============================
   * TEST 2: KAPAL (CBIB Kapal)
   * =============================== */
  console.log("\n--- TEST CBIB KAPAL ---");
  const kapalResult = await getPropinsiPerIzin({
    startDate,
    endDate,
    kdIzin: "032000000033", // IZIN_KAPAL
    limit: 5,
  });

  console.table(kapalResult);

  console.log("\n===== TEST SELESAI =====");
}

runTest()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("TEST ERROR:", err);
    process.exit(1);
  });
