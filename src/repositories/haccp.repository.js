// src/repositories/haccp.repository.js
import Vw07_sertifikasi from "../models/haccp/vw07_sertifikasi.js";
import { Op, fn, col } from "sequelize";

export const getHACCPGroupedByProvinsiAndGrade = async (startDate, endDate) => {
  return Vw07_sertifikasi.findAll({
    attributes: [
      "nm_provinsi",
      "grade",
      [fn("COUNT", col("no_haccp")), "jumlah"],
    ],
    where: {
      no_haccp: { [Op.ne]: null },
      status_sert: "BERLAKU",
      tgl_terbit: {
        [Op.between]: [startDate, endDate],
      },
    },
    group: ["nm_provinsi", "grade"],
    order: [["nm_provinsi", "ASC"]],
    raw: true, // penting: hasil plain object
  });
};
