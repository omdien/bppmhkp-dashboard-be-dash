// src/repositories/kapal.repository.js
import { Sequelize } from "sequelize";
import { db_kapal } from "../config/Database.js";
import TbCbibKapal from "../models/kapal/tb_cbib_kapal.js";

export const getCBIBKapalRekap = async (start, end) => {
  return TbCbibKapal.findAll({
    attributes: [
      "kode_provinsi",
      "nama_provinsi",
      [Sequelize.fn("COUNT", Sequelize.col("id_cbib")), "jumlah"],
    ],
    where: {
      tgl_terbit: {
        [Sequelize.Op.between]: [start, end],
      },
    },
    group: ["kode_provinsi", "nama_provinsi"],
    raw: true,
  });
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
