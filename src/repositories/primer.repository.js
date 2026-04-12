import { db_report_primer } from "../config/Database.js";
import { QueryTypes } from "sequelize";

export const getRekapPrimerExport = async (startDate, endDate) => {
  try {
    const query = `
      SELECT 
        LEFT(perseroan_daerah_id, 2) as kode_propinsi,
        ur_izin_singkat, 
        COUNT(*) as jumlah
      FROM tr_laporan_primer_export
      WHERE tgl_izin BETWEEN :start AND :end
      GROUP BY kode_propinsi, ur_izin_singkat
    `;
    
    return await db_report_primer.query(query, {
      replacements: { start: startDate, end: endDate },
      type: QueryTypes.SELECT
    });
  } catch (error) {
    console.error("Error getRekapPrimerExport:", error.original?.message || error.message);
    throw error;
  }
};

export const getPropinsiPerIzinPrimer = async (startDate, endDate, kdIzin, limit) => {
  try {
    let query = `
      SELECT 
        uraian_propinsi as URAIAN_PROPINSI,
        COUNT(*) as Jumlah
      FROM tr_laporan_primer_export
      WHERE tgl_izin BETWEEN :start AND :end
        AND kd_izin = :kdIzin
      GROUP BY URAIAN_PROPINSI
      ORDER BY Jumlah DESC
    `;

    if (limit) query += ` LIMIT ${parseInt(limit)}`;

    return await db_report_primer.query(query, {
      replacements: { start: startDate, end: endDate, kdIzin: kdIzin },
      type: QueryTypes.SELECT
    });
  } catch (error) {
    console.error("Error getPropinsiPerIzinPrimer:", error.original?.message || error.message);
    throw error;
  }
};