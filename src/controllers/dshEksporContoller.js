import Tr_report_ekspor from "../models/smkhp/tr_report_ekspor.js";
import { Sequelize } from "sequelize";

// get Ekspor Summary
export const getSummaryEkspor = async (req, res) => {
  const Op = Sequelize.Op;
  try {
    const { kdUpt, tglAwal, tglAkhir } = req.params;

    // format datetime lengkap
    const startFullDate = `${tglAwal} 00:00:00`;
    const endFullDate = `${tglAkhir} 23:59:59`;

    // base where
    let where = {
      tanggal_smkhp: {
        [Op.between]: [startFullDate, endFullDate],
      },
    };

    // filter kdUpt kalau bukan 00.x
    if (!["00.1", "00.2", "00.3"].includes(kdUpt)) {
      where = {
        [Op.and]: [
          { kode_upt: { [Op.like]: `%${kdUpt}%` } },
          where,
        ],
      };
    }

    // Query paralel
    const [jumFreq, jumVol, nilai] = await Promise.all([
      Tr_report_ekspor.count({
        where,
        distinct: true,
        col: "nomor_aju",
      }),
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

    res.status(200).json({
      jumFreq,
      totalVolume: jumVol?.totalVolume || 0,
      totalNilaiIDR: nilai?.totalNilaiIDR || 0,
      totalNilaiUSD: nilai?.totalNilaiUSD || 0,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const getEksporHarian = async (req, res) => {
  const { kdUpt, tglAwal, tglAkhir } = req.params;
  const Op = Sequelize.Op;

  // Tambahkan waktu ke tglAwal dan tglAkhir
  const startDate = `${tglAwal} 00:00:00`;
  const endDate = `${tglAkhir} 23:59:59`;

  try {
    const whereCondition =
      kdUpt === "00.1" || kdUpt === "00.2" || kdUpt === "00.3"
        ? {
          tanggal_smkhp: {
            [Op.between]: [startDate, endDate],
          },
        }
        : {
          [Op.and]: [
            { kode_upt: { [Op.like]: `%${kdUpt}%` } },
            { tanggal_smkhp: { [Op.between]: [startDate, endDate] } },
          ],
        };

    const response = await Tr_report_ekspor.findAll({
      attributes: [
        [Sequelize.fn("DAY", Sequelize.col("tanggal_smkhp")), "TANGGAL"],
        [
          Sequelize.fn(
            "COUNT",
            Sequelize.fn("DISTINCT", Sequelize.col("nomor_aju"))
          ),
          "JUMLAH",
        ],
        [Sequelize.fn("SUM", Sequelize.col("netto")), "NETTO"],
        [Sequelize.fn("SUM", Sequelize.col("nilai_rupiah")), "NILAIIDR"],
        [Sequelize.literal("SUM(nilai_rupiah / kurs_usd)"), "NILAIUSD"],
      ],
      where: whereCondition,
      order: [["TANGGAL", "ASC"]],
      group: ["TANGGAL"],
    });

    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getEksporBulanan = async (req, res) => {
  const { kdUpt, tglAwal, tglAkhir } = req.params;
  const Op = Sequelize.Op;

  // Tambahkan jam ke tanggal awal & akhir
  const startDate = `${tglAwal} 00:00:00`;
  const endDate = `${tglAkhir} 23:59:59`;

  try {
    const whereCondition =
      kdUpt === "00.1" || kdUpt === "00.2" || kdUpt === "00.3"
        ? {
          tanggal_smkhp: {
            [Op.between]: [startDate, endDate],
          },
        }
        : {
          [Op.and]: [
            { kode_upt: { [Op.like]: `%${kdUpt}%` } },
            { tanggal_smkhp: { [Op.between]: [startDate, endDate] } },
          ],
        };

    const response = await Tr_report_ekspor.findAll({
      attributes: [
        [Sequelize.fn("MONTH", Sequelize.col("tanggal_smkhp")), "BULAN"],
        [
          Sequelize.fn(
            "COUNT",
            Sequelize.fn("DISTINCT", Sequelize.col("nomor_aju"))
          ),
          "JUMLAH",
        ],
        [Sequelize.fn("SUM", Sequelize.col("netto")), "NETTO"],
        [Sequelize.fn("SUM", Sequelize.col("nilai_rupiah")), "NILAIIDR"],
        [Sequelize.literal("SUM(nilai_rupiah / kurs_usd)"), "NILAIUSD"],
      ],
      where: whereCondition,
      group: [Sequelize.fn("MONTH", Sequelize.col("tanggal_smkhp"))],
      order: [[Sequelize.fn("MONTH", Sequelize.col("tanggal_smkhp")), "ASC"]],
    });

    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

