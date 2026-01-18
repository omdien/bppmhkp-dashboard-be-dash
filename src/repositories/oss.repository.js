// src/repositories/oss.repository.js
import { Sequelize } from "sequelize";
import { db_mutu } from "../config/Database.js";

export const getRekapIzinPrimer = async (start, end) => {
  const query = `
    SELECT 
      LEFT(oss.kd_daerah, 2) AS kode_propinsi,
      izin.ur_izin_singkat,
      COUNT(oss.idchecklist) AS jumlah
    FROM tr_oss_checklist oss
    LEFT JOIN tb_perizinan izin ON oss.kd_izin = izin.kd_izin
    WHERE oss.sts_aktif = '1'
      AND oss.status_checklist = '50'
      AND oss.kd_izin != '032000000023'
      AND oss.tgl_izin BETWEEN :start AND :end
    GROUP BY kode_propinsi, izin.ur_izin_singkat
  `;

  return db_mutu.query(query, {
    replacements: { start, end },
    type: Sequelize.QueryTypes.SELECT,
  });
};

export const getPropinsiPerIzin = async (
  startDate,
  endDate,
  kdIzin,
  limit
) => {
  const limitSql = limit ? "LIMIT :limit" : "";

  return db_mutu.query(
    `
    SELECT
      COUNT(a.id_izin) AS Jumlah,
      c.URAIAN_PROPINSI
    FROM mutu.tr_oss_checklist a
    JOIN hc.tb_propinsi c 
      ON c.KODE_PROPINSI = SUBSTRING(a.kd_daerah, 1, 2)
    WHERE a.sts_aktif = '1'
      AND a.status_checklist = '50'
      AND a.tgl_izin BETWEEN :startDate AND :endDate
      AND a.kd_izin = :kdIzin
    GROUP BY c.URAIAN_PROPINSI
    ORDER BY Jumlah DESC
    ${limitSql}
    `,
    {
      replacements: { startDate, endDate, kdIzin, limit },
      type: Sequelize.QueryTypes.SELECT,
    }
  );
};
