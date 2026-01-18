import { Op, Sequelize } from "sequelize";
import TbSkpPaska from "../models/skp/tb_skp_paska.js";

/* ============================================================
   Helper WHERE
   ============================================================ */
const buildWhere = (startDate, endDate) => {
  const now = new Date();
  const year = now.getFullYear();

  const rangeStart = startDate ? new Date(startDate) : new Date(`${year}-01-01`);
  const rangeEnd = endDate ? new Date(endDate) : new Date(`${year}-12-31`);

  return {
    tanggal_terbit: {
      [Op.between]: [rangeStart, rangeEnd],
    },
  };
};

/* ============================================================
   Repository Functions
   ============================================================ */
export const countResume = async (startDate, endDate) => {
  const where = buildWhere(startDate, endDate);

  return {
    sertifikat: await TbSkpPaska.count({ where }),
    upi: await TbSkpPaska.count({ distinct: true, col: "nib", where }),
    provinsi: await TbSkpPaska.count({ distinct: true, col: "provinsi_id", where }),
    kabupaten: await TbSkpPaska.count({ distinct: true, col: "regency_id", where }),
  };
};

export const trenBulanan = async (startDate, endDate) => {
  const where = buildWhere(startDate, endDate);

  return TbSkpPaska.findAll({
    attributes: [
      [Sequelize.fn("MONTH", Sequelize.col("tanggal_terbit")), "bulan"],
      [Sequelize.fn("COUNT", Sequelize.col("id")), "jumlah"],
    ],
    where,
    group: [Sequelize.fn("MONTH", Sequelize.col("tanggal_terbit"))],
    order: [[Sequelize.fn("MONTH", Sequelize.col("tanggal_terbit")), "ASC"]],
    raw: true,
  });
};

export const groupCount = async (field, startDate, endDate, limit) => {
  const where = buildWhere(startDate, endDate);

  return TbSkpPaska.findAll({
    attributes: [
      field,
      [Sequelize.fn("COUNT", Sequelize.col("id")), "jumlah"],
    ],
    where,
    group: [field],
    order: [[Sequelize.literal("jumlah"), "DESC"]],
    limit,
    raw: true,
  });
};
