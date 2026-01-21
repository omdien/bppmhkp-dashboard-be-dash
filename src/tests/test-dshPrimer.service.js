// src/tests/test-dshPrimer.service.js
import { rekapIzinPrimer } from "../services/dshPrimer.service.js";

(async () => {
  try {
    const result = await rekapIzinPrimer({
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      limit: 10,
    });

    console.log("===== RESULT =====");
    console.table(result.data);
    console.log("===== REKAP =====");
    console.log(result.rekap);
  } catch (err) {
    console.error("ERROR:", err);
  } finally {
    process.exit(0);
  }
})();
