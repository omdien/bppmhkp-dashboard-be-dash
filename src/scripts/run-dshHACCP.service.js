// src/scripts/run-dshHACCP.service.js
import "dotenv/config";
import {
  getHACCPPerPropinsiPerGrade,
  getHaccpPerBulan,
} from "../services/dshHACCP.service.js";

async function run() {
  const startDate = "2025-01-01";
  const endDate = "2025-12-31";
  const limit = 10;
  const tahun = 2025;

  try {
    /* =====================================================
       TEST 1: HACCP PER PROPINSI PER GRADE
       (SUDAH FIX – JANGAN DIUBAH)
       ===================================================== */
    console.log("\n========================================");
    console.log("📊 HACCP PER PROPINSI PER GRADE");
    console.log("========================================\n");

    const perProvinsi = await getHACCPPerPropinsiPerGrade({
      startDate,
      endDate,
      limit,
    });

    console.table(perProvinsi.data);

    console.log("\n🔢 RINGKASAN:");
    console.log("Total HACCP :", perProvinsi.totHACCP);
    console.log("Grade A     :", perProvinsi.totGradeA);
    console.log("Grade B     :", perProvinsi.totGradeB);
    console.log("Grade C     :", perProvinsi.totGradeC);

    /* =====================================================
       TEST 2: HACCP PER BULAN (GRADE x BULAN)
       ===================================================== */
    console.log("\n========================================");
    console.log(`📅 HACCP PER BULAN (${tahun})`);
    console.log("========================================\n");

    const perBulan = await getHaccpPerBulan(startDate, endDate);

    console.table(perBulan);

    console.log("\n✅ SEMUA TEST HACCP SERVICE SELESAI\n");
  } catch (error) {
    console.error("\n❌ ERROR TEST HACCP SERVICE");
    console.error(error.message);
  } finally {
    process.exit(0);
  }
}

run();
