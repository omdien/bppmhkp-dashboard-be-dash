// services/analytics/DashboardSMKHPService.js
import { Op, Sequelize } from "sequelize";
import Tb_SMKHP from "../../models/smkhp/tr_report_ekspor.js";  // model utama

/**
 * A. Ringkasan Eksekutif (KPI Cards)
 */
export const getSummaryData = async (kdUpt, tglAwal, tglAkhir) => {
    const Op = Sequelize.Op;

    const startFullDate = `${tglAwal} 00:00:00`;
    const endFullDate = `${tglAkhir} 23:59:59`;

    let where = {
        tanggal_smkhp: { [Op.between]: [startFullDate, endFullDate] },
    };

    if (!["00.1", "00.2", "00.3"].includes(kdUpt)) {
        where = {
            [Op.and]: [
                { kode_upt: { [Op.like]: `%${kdUpt}%` } },
                where,
            ],
        };
    }

    const [freq, volume, nilai, tambahan] = await Promise.all([
        Tb_SMKHP.count({ where, distinct: true, col: "nomor_aju" }),

        Tb_SMKHP.findOne({
            attributes: [[Sequelize.literal("SUM(netto)/1000"), "total_volume_ton"]],
            where,
            raw: true,
        }),

        Tb_SMKHP.findOne({
            attributes: [
                [Sequelize.fn("SUM", Sequelize.col("nilai_rupiah")), "total_idr"],
                [Sequelize.literal("SUM(nilai_rupiah / kurs_usd)"), "total_usd"],
            ],
            where,
            raw: true,
        }),

        Tb_SMKHP.findOne({
            attributes: [
                [Sequelize.fn("COUNT", Sequelize.fn("DISTINCT", Sequelize.col("kode_trader"))), "total_trader"],
                [Sequelize.fn("COUNT", Sequelize.fn("DISTINCT", Sequelize.col("negara_tujuan"))), "total_negara"],
            ],
            where,
            raw: true,
        }),
    ]);

    return {
        total_freq: freq || 0,
        total_volume_ton: volume?.total_volume_ton || 0,
        total_idr: nilai?.total_idr || 0,
        total_usd: nilai?.total_usd || 0,
        total_trader: tambahan?.total_trader || 0,
        total_negara: tambahan?.total_negara || 0,
    };
};

/**
 * B. Tren Waktu (Per Bulan)
 */
export const getTrenBulananData = async (start, end) => {
    return await Tb_SMKHP.findAll({
        attributes: [
            [Sequelize.fn("DATE_FORMAT", Sequelize.col("tanggal_smkhp"), "%Y-%m"), "periode"],
            [Sequelize.fn("COUNT", Sequelize.col("nomor_aju")), "frekuensi"],
            [Sequelize.fn("SUM", Sequelize.col("volume")), "volume"],
            [Sequelize.fn("SUM", Sequelize.col("nilai_idr")), "nilai_idr"],
            [Sequelize.fn("SUM", Sequelize.col("nilai_usd")), "nilai_usd"]
        ],
        where: { tanggal_smkhp: { [Op.between]: [start, end] } },
        group: ["periode"],
        order: [["periode", "ASC"]],
        raw: true
    });
};

/**
 * C. Peta Asal & Tujuan (Agregat per Negara)
 */
export const getNegaraTujuanData = async (start, end) => {
    return await Tb_SMKHP.findAll({
        attributes: [
            "negara_tujuan",
            [Sequelize.fn("SUM", Sequelize.col("volume")), "total_volume"],
            [Sequelize.fn("SUM", Sequelize.col("nilai_usd")), "total_usd"],
            [Sequelize.fn("COUNT", Sequelize.col("nomor_aju")), "frekuensi"]
        ],
        where: { tanggal_smkhp: { [Op.between]: [start, end] } },
        group: ["negara_tujuan"],
        order: [[Sequelize.fn("SUM", Sequelize.col("nilai_usd")), "DESC"]],
        raw: true
    });
};

/**
 * D. Komoditas / Produk Teratas
 */
export const getTopKomoditasData = async (start, end, limit = 10) => {
    return await Tb_SMKHP.findAll({
        attributes: [
            "nm_dagang",
            [Sequelize.fn("SUM", Sequelize.col("volume")), "total_volume"],
            [Sequelize.fn("SUM", Sequelize.col("nilai_usd")), "total_usd"]
        ],
        where: { tanggal_smkhp: { [Op.between]: [start, end] } },
        group: ["nm_dagang"],
        order: [[Sequelize.fn("SUM", Sequelize.col("nilai_usd")), "DESC"]],
        limit,
        raw: true
    });
};

/**
 * E. Top Trader
 */
export const getTopTraderData = async (start, end, limit = 10) => {
    return await Tb_SMKHP.findAll({
        attributes: [
            "kode_trader",
            [Sequelize.fn("SUM", Sequelize.col("nilai_usd")), "total_usd"],
            [Sequelize.fn("SUM", Sequelize.col("volume")), "total_volume"],
            [Sequelize.fn("COUNT", Sequelize.col("nomor_aju")), "frekuensi"]
        ],
        where: { tanggal_smkhp: { [Op.between]: [start, end] } },
        group: ["kode_trader"],
        order: [[Sequelize.fn("SUM", Sequelize.col("nilai_usd")), "DESC"]],
        limit,
        raw: true
    });
};

/**
 * F. Rasio & Efisiensi
 */
export const getRasioEfisiensiData = async (start, end) => {
    const data = await Tb_SMKHP.findAll({
        attributes: [
            [Sequelize.fn("SUM", Sequelize.col("nilai_usd")), "total_usd"],
            [Sequelize.fn("SUM", Sequelize.col("nilai_idr")), "total_idr"],
            [Sequelize.fn("SUM", Sequelize.col("volume")), "total_volume"],
            [Sequelize.fn("COUNT", Sequelize.col("nomor_aju")), "frekuensi"]
        ],
        where: { tanggal_smkhp: { [Op.between]: [start, end] } },
        raw: true
    });

    const d = data[0];
    return {
        ...d,
        rasio_usd_per_ton: d.total_volume ? d.total_usd / d.total_volume : 0,
        rasio_idr_per_ton: d.total_volume ? d.total_idr / d.total_volume : 0,
        nilai_per_frekuensi: d.frekuensi ? d.total_usd / d.frekuensi : 0
    };
};
