// src/repositories/haccp.repository.js
import Vw07_sertifikasi from "../models/haccp/vw07_sertifikasi.js";
import { Op, fn, col } from "sequelize";
import { Sequelize } from "sequelize";

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

export const getHaccpPerBulanRaw = async (startDate, endDate) => {
  return Vw07_sertifikasi.findAll({
    attributes: [
      "grade",
      [Sequelize.fn("MONTH", Sequelize.col("tgl_terbit")), "bulan"],
      [Sequelize.fn("COUNT", Sequelize.col("no_haccp")), "jumlah"],
    ],
    where: {
      no_haccp: { [Op.ne]: null },
      status_sert: "BERLAKU",
      tgl_terbit: {
        [Op.between]: [startDate, endDate],
      },
    },
    group: ["grade", Sequelize.fn("MONTH", Sequelize.col("tgl_terbit"))],
    raw: true,
  });
};

export const findHaccpPerTahun = async (startDate, endDate) => {
  return await Vw07_sertifikasi.findAll({
    attributes: [
      "grade",
      [Sequelize.fn("COUNT", Sequelize.col("no_haccp")), "jumlah"],
    ],
    where: {
      no_haccp: { [Op.ne]: null },
      status_sert: "BERLAKU",
      tgl_terbit: {
        [Op.between]: [startDate, endDate],
      },
    },
    group: ["grade"],
    raw: true,
  });
};


