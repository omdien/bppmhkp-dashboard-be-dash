import { Op, Sequelize } from "sequelize";
import TbSkpPaska from "../models/skp/tb_skp_paska.js";

/* ============================================================
   Helper WHERE
   ============================================================ */
const buildWhere = (startDate, endDate) => {
  const now = new Date();
  const year = now.getFullYear();

  const rangeStart = startDate
    ? `${startDate} 00:00:00`
    : `${year}-01-01 00:00:00`;

  const rangeEnd = endDate
    ? `${endDate} 23:59:59`
    : `${year}-12-31 23:59:59`;

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

  const options = {
    attributes: [
      field,
      [Sequelize.fn("COUNT", Sequelize.col("id")), "jumlah"],
    ],
    where,
    group: [field],
    order: [[Sequelize.literal("jumlah"), "DESC"]],
    raw: true,
  };

  if (Number.isInteger(limit) && limit > 0) {
    options.limit = limit;
  }

  return TbSkpPaska.findAll(options);
};

