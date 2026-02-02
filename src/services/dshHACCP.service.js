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

export const getHaccpPerBulan = async (startDate, endDate) => {
  const rawData = await Repo.getHaccpPerBulanRaw(startDate, endDate);

  const bulanList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const pivot = {};

  rawData.forEach((row) => {
    const grade = row.grade || "UNKNOWN";
    const bulan = Number(row.bulan);
    const jumlah = Number(row.jumlah) || 0;

    if (!pivot[grade]) {
      pivot[grade] = {};
      bulanList.forEach((b) => (pivot[grade][b] = 0));
    }

    pivot[grade][bulan] = jumlah;
  });

  return Object.entries(pivot).map(([grade, bulanData]) => ({
    grade,
    jan: bulanData[1],
    feb: bulanData[2],
    mar: bulanData[3],
    apr: bulanData[4],
    mei: bulanData[5],
    jun: bulanData[6],
    jul: bulanData[7],
    aug: bulanData[8],
    sep: bulanData[9],
    okt: bulanData[10],
    nov: bulanData[11],
    des: bulanData[12],
  }));
};

export const getHaccpPerTahun = async (startDate, endDate) => {
  const rows = await Repo.findHaccpPerTahun(startDate, endDate);

  const result = {};
  let total = 0;

  rows.forEach((row) => {
    const grade = row.grade;
    const jumlah = Number(row.jumlah) || 0;

    result[grade] = jumlah;
    total += jumlah;
  });

  result.JUMLAH = total;

  return result;
};