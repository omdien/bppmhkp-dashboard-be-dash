import Tr_report_ekspor from "../models/tr_report_ekspor.js";
import { Sequelize } from "sequelize";

// get Ekspor Summary
export const getSummaryEkspor = async (req, res) => {
  const Op = Sequelize.Op;
  try {
    const { kdUpt, tglAwal, tglAkhir } = req.params;

    // format datetime lengkap
    const startFullDate = `${tglAwal} 00:00:00`;
    const endFullDate   = `${tglAkhir} 23:59:59`;

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
