// src/services/dshPrimer.service.js
import * as ossRepo from "../repositories/oss.repository.js";
import * as kapalRepo from "../repositories/kapal.repository.js";
import { getAllPropinsiMap } from "../repositories/propinsi.repository.js";

export const rekapIzinPrimer = async ({
  startDate,
  endDate,
  limit,
}) => {
  const start = startDate ? `${startDate} 00:00:00` : "2024-01-01 00:00:00";
  const end = endDate ? `${endDate} 23:59:59` : "2024-12-31 23:59:59";

  const [ossRows, kapalRows, propinsiMap] = await Promise.all([
    ossRepo.getRekapIzinPrimer(start, end),
    kapalRepo.getCBIBKapalRekap(start, end),
    getAllPropinsiMap(),
  ]);

  const pivotMap = {};
  const total = {
    CPIB: 0,
    CBIB: 0,
    CPPIB: 0,
    CPOIB: 0,
    CDOIB: 0,
    CBIB_Kapal: 0,
    total: 0,
  };

  // OSS
  ossRows.forEach((r) => {
    const nama = propinsiMap[r.kode_propinsi] || r.kode_propinsi;
    pivotMap[nama] ??= {
      propinsi: nama,
      CPIB: 0,
      CBIB: 0,
      CPPIB: 0,
      CPOIB: 0,
      CDOIB: 0,
      CBIB_Kapal: 0,
      total: 0,
    };

    pivotMap[nama][r.ur_izin_singkat] += r.jumlah;
    pivotMap[nama].total += r.jumlah;

    total[r.ur_izin_singkat] += r.jumlah;
    total.total += r.jumlah;
  });

  // Kapal
  // Kapal (FIXED)
  kapalRows.forEach((r) => {
    if (!r.kode_provinsi) return; // safety

    const kode = r.kode_provinsi.padStart(2, "0");
    const nama = propinsiMap[kode] || kode;

    pivotMap[nama] ??= {
      propinsi: nama,
      CPIB: 0,
      CBIB: 0,
      CPPIB: 0,
      CPOIB: 0,
      CDOIB: 0,
      CBIB_Kapal: 0,
      total: 0,
    };

    pivotMap[nama].CBIB_Kapal += r.jumlah;
    pivotMap[nama].total += r.jumlah;

    total.CBIB_Kapal += r.jumlah;
    total.total += r.jumlah;
  });


  let result = Object.values(pivotMap).sort((a, b) => b.total - a.total);

  if (limit) result = result.slice(0, limit);

  return { data: result, rekap: total };
};

const IZIN_KAPAL = "032000000033";
export const getPropinsiPerIzin = async ({
  startDate,
  endDate,
  kdIzin,
  limit,
}) => {
  const limitNum = limit ? parseInt(limit, 10) : null;

  if (kdIzin !== IZIN_KAPAL) {
    return ossRepo.getPropinsiPerIzin(
      startDate,
      endDate,
      kdIzin,
      limitNum
    );
  }

  return kapalRepo.getPropinsiCBIBKapal(
    startDate,
    endDate,
    limitNum
  );
};