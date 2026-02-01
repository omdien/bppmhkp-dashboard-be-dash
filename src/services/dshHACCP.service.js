// src/services/dshHACCP.service.js
import * as Repo from "../repositories/haccp.repository.js";

/**
 * 📊 HACCP per Propinsi per Grade
 * @param {Object} params
 * @param {string} params.startDate - YYYY-MM-DD
 * @param {string} params.endDate   - YYYY-MM-DD
 * @param {number} [params.limit]   - optional limit
 */
export const getHACCPPerPropinsiPerGrade = async ({
  startDate,
  endDate,
  limit,
}) => {
  if (!startDate || !endDate) {
    throw new Error("startDate dan endDate wajib diisi");
  }

  // 🔹 ambil data mentah dari repository
  const rawData = await Repo.getHACCPGroupedByProvinsiAndGrade(
    startDate,
    endDate
  );

  const resultMap = {};

  let totHACCP = 0;
  let totGradeA = 0;
  let totGradeB = 0;
  let totGradeC = 0;

  // 🔹 olah data pivot
  rawData.forEach((row) => {
    const provinsi = row.nm_provinsi;
    const grade = (row.grade || "").toUpperCase();
    const jumlah = Number(row.jumlah) || 0;

    totHACCP += jumlah;

    if (!resultMap[provinsi]) {
      resultMap[provinsi] = {
        nm_provinsi: provinsi,
        grade_a: 0,
        grade_b: 0,
        grade_c: 0,
      };
    }

    switch (grade) {
      case "A":
        resultMap[provinsi].grade_a += jumlah;
        totGradeA += jumlah;
        break;
      case "B":
        resultMap[provinsi].grade_b += jumlah;
        totGradeB += jumlah;
        break;
      case "C":
        resultMap[provinsi].grade_c += jumlah;
        totGradeC += jumlah;
        break;
      default:
        break;
    }
  });

  // 🔹 ubah ke array + hitung total per propinsi
  let result = Object.values(resultMap).map((item) => ({
    ...item,
    jumlah: item.grade_a + item.grade_b + item.grade_c,
  }));

  // 🔹 sort terbesar ke kecil
  result.sort((a, b) => b.jumlah - a.jumlah);

  // 🔹 apply limit (opsional)
  if (Number.isInteger(limit) && limit > 0) {
    result = result.slice(0, limit);
  }

  // 🔹 response konsisten dengan dashboard lain
  return {
    data: result,
    totHACCP,
    totGradeA,
    totGradeB,
    totGradeC,
  };
};
