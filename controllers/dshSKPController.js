import { Op } from "sequelize";
import Tb_skp_paska from "../models/skp/tb_skp_paska.js";

/**
 * GET /api/dashboard/skp/resume-skp
 * Optional Query: startDate, endDate
 * Default: tahun berjalan (1 Jan – 31 Des)
 */
export const getResumeSKP = async (req, res) => {
  try {
    // Ambil query parameter
    const { startDate, endDate } = req.query;

    // Range default tahun berjalan
    const now = new Date();
    const year = now.getFullYear();

    const rangeStart = startDate ? new Date(startDate) : new Date(`${year}-01-01`);
    const rangeEnd = endDate ? new Date(endDate) : new Date(`${year}-12-31`);

    // Filter tanggal
    const whereClause = {
      tanggal_terbit: {
        [Op.between]: [rangeStart, rangeEnd],
      },
    };

    // Hitung statistik
    const [sertifikat, upi, provinsi, kabupaten] = await Promise.all([
      Tb_skp_paska.count({ where: whereClause }),
      Tb_skp_paska.count({ distinct: true, col: "nib", where: whereClause }),
      Tb_skp_paska.count({ distinct: true, col: "provinsi_id", where: whereClause }),
      Tb_skp_paska.count({ distinct: true, col: "regency_id", where: whereClause }),
    ]);

    // Bentuk response final (tanpa periode)
    return res.json({
      sertifikat,
      upi,
      provinsi,
      kabupaten,
    });
  } catch (error) {
    console.error("❌ Error getResumeSKP:", error);
    return res.status(500).json({ message: "Gagal mengambil data resume SKP" });
  }
};
