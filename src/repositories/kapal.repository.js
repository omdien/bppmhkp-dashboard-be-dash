// src/repositories/kapal.repository.js
import { Sequelize } from "sequelize";
import { db_kapal } from "../config/Database.js";

export const getCBIBKapalRekap = async (start, end) => {
  return db_kapal.query(
    `
    SELECT 
      nama_provinsi AS propinsi,
      COUNT(*) AS jumlah
    FROM tb_cbib_kapal
    WHERE tgl_terbit BETWEEN :start AND :end
    GROUP BY nama_provinsi
    `,
    {
      replacements: { start, end },
      type: Sequelize.QueryTypes.SELECT,
    }
  );
};

export const getPropinsiCBIBKapal = async (startDate, endDate, limit) => {
  const limitSql = limit ? "LIMIT :limit" : "";

  return db_kapal.query(
    `
    SELECT 
      nama_provinsi AS URAIAN_PROPINSI,
      COUNT(*) AS Jumlah
    FROM tb_cbib_kapal
    WHERE tgl_terbit BETWEEN :startDate AND :endDate
    GROUP BY nama_provinsi
    ORDER BY Jumlah DESC
    ${limitSql}
    `,
    {
      replacements: { startDate, endDate, limit },
      type: Sequelize.QueryTypes.SELECT,
    }
  );
};
