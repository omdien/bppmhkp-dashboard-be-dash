import Tr_report_ekspor from "../models/smkhp/tr_report_ekspor.js";
import { Sequelize } from "sequelize";

const Op = Sequelize.Op;

const buildWhereCondition = ({ kdUpt, tglAwal, tglAkhir, negara, upt, komoditas }) => {
  const startDate = `${tglAwal} 00:00:00`;
  const endDate = `${tglAkhir} 23:59:59`;

  const conditions = [
    { tanggal_smkhp: { [Op.between]: [startDate, endDate] } },
  ];

  if (!["00.1", "00.2", "00.3"].includes(kdUpt)) {
    conditions.push({ kode_upt: { [Op.like]: `%${kdUpt}%` } });
  }

  if (negara) conditions.push({ negara_tujuan: { [Op.like]: `%${negara}%` } });
  if (upt)    conditions.push({ kode_upt: { [Op.like]: `%${upt}%` } });
  if (komoditas) conditions.push({ uraian_hs: { [Op.like]: `%${komoditas}%` } });

  return { [Op.and]: conditions };
};

export const getSummaryEksporRepo = async (params) => {
  const where = buildWhereCondition(params);

  const [jumFreq, jumVol, nilai] = await Promise.all([
    Tr_report_ekspor.count({ where, distinct: true, col: "nomor_aju" }),
    Tr_report_ekspor.findOne({
      attributes: [[Sequelize.fn("SUM", Sequelize.col("netto")), "totalVolume"]],
      where,
      raw: true,
    }),
    Tr_report_ekspor.findOne({
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("nilai_rupiah")), "totalNilaiIDR"],
        [Sequelize.literal("SUM(nilai_rupiah / kurs_usd)"), "totalNilaiUSD"],
      ],
      where,
      raw: true,
    }),
  ]);

  return {
    jumFreq,
    totalVolume:   jumVol?.totalVolume  || 0,
    totalNilaiIDR: nilai?.totalNilaiIDR || 0,
    totalNilaiUSD: nilai?.totalNilaiUSD || 0,
  };
};

export const getEksporHarianRepo = async (params) => {
  const where = buildWhereCondition(params);

  return Tr_report_ekspor.findAll({
    attributes: [
      [Sequelize.fn("DAY", Sequelize.col("tanggal_smkhp")), "TANGGAL"],
      [Sequelize.fn("COUNT", Sequelize.fn("DISTINCT", Sequelize.col("nomor_aju"))), "JUMLAH"],
      [Sequelize.fn("SUM", Sequelize.col("netto")), "NETTO"],
      [Sequelize.fn("SUM", Sequelize.col("nilai_rupiah")), "NILAIIDR"],
      [Sequelize.literal("SUM(nilai_rupiah / kurs_usd)"), "NILAIUSD"],
    ],
    where,
    group: ["TANGGAL"],
    order: [["TANGGAL", "ASC"]],
  });
};

export const getEksporBulananRepo = async (params) => {
  const where = buildWhereCondition(params);

  return Tr_report_ekspor.findAll({
    attributes: [
      [Sequelize.fn("MONTH", Sequelize.col("tanggal_smkhp")), "BULAN"],
      [Sequelize.fn("COUNT", Sequelize.fn("DISTINCT", Sequelize.col("nomor_aju"))), "JUMLAH"],
      [Sequelize.fn("SUM", Sequelize.col("netto")), "NETTO"],
      [Sequelize.fn("SUM", Sequelize.col("nilai_rupiah")), "NILAIIDR"],
      [Sequelize.literal("SUM(nilai_rupiah / kurs_usd)"), "NILAIUSD"],
    ],
    where,
    group: [Sequelize.fn("MONTH", Sequelize.col("tanggal_smkhp"))],
    order: [[Sequelize.fn("MONTH", Sequelize.col("tanggal_smkhp")), "ASC"]],
  });
};