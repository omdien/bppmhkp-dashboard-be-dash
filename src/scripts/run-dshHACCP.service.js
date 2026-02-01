// src/scripts/run-dshHACCP.service.js
import "dotenv/config";
import {
  getHACCPPerPropinsiPerGrade,
} from "../services/dshHACCP.service.js";

async function run() {
  const startDate = "2025-01-01";
  const endDate = "2025-12-31";
  const limit = 10; // ganti null / 'all' kalau mau semua

  try {
    console.log("\n==============================");
    console.log("📊 HACCP PER PROPINSI PER GRADE");
    console.log("==============================\n");

    const result = await getHACCPPerPropinsiPerGrade({
      startDate,
      endDate,
      limit,
    });

    // 🔹 Data utama
    console.table(result.data);

    // 🔹 Ringkasan
    console.log("\n🔢 RINGKASAN:");
    console.log("Total HACCP :", result.totHACCP);
    console.log("Grade A     :", result.totGradeA);
    console.log("Grade B     :", result.totGradeB);
    console.log("Grade C     :", result.totGradeC);

    console.log("\n✅ TEST HACCP SERVICE SELESAI\n");
  } catch (error) {
    console.error("\n❌ ERROR TEST HACCP SERVICE");
    console.error(error);
  } finally {
    process.exit(0);
  }
}

run();
