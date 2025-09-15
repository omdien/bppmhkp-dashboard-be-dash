import { Sequelize } from "sequelize";
import {db_mutu} from "../config/Database.js"; 
import Tb_propinsi from "../models/tb_propinsi.js"; 


export const rekap_izin_primer = async (req, res) => {
    try {
        const { startDate, endDate, limit } = req.query;

        const start = startDate ? `${startDate} 00:00:00` : '2024-01-01 00:00:00';
        const end = endDate ? `${endDate} 23:59:59` : '2024-12-31 23:59:59';
        const limitNumber = limit ? parseInt(limit) : null;

        const query = `
      SELECT 
        LEFT(oss.kd_daerah, 2) AS kode_propinsi,
        izin.ur_izin_singkat,
        COUNT(oss.idchecklist) AS jumlah
      FROM tr_oss_checklist oss
      LEFT JOIN tb_perizinan izin ON oss.kd_izin = izin.kd_izin
      WHERE oss.sts_aktif = '1'
        AND oss.status_checklist = '50'
        AND oss.kd_izin != '032000000023'
        AND oss.tgl_izin BETWEEN :start AND :end
      GROUP BY kode_propinsi, izin.ur_izin_singkat
      ORDER BY kode_propinsi, izin.ur_izin_singkat
    `;

        const results = await db_mutu.query(query, {
            replacements: { start, end },
            type: Sequelize.QueryTypes.SELECT,
        });

        const propinsiList = await Tb_propinsi.findAll();
        const propinsiMap = {};
        propinsiList.forEach(p => {
            const kode = p.KODE_PROPINSI.toString().padStart(2, '0');
            propinsiMap[kode] = p.URAIAN_PROPINSI;
        });

        // Setup awal: izin yang ingin ditampilkan
        const izinKeys = ["CPIB", "CBIB", "CPPIB", "CPOIB", "CDOIB"];
        const pivotMap = {};
        const totalRekap = {
            CPIB: 0,
            CBIB: 0,
            CPPIB: 0,
            CPOIB: 0,
            CDOIB: 0,
            total: 0,
        };

        // Build pivot map
        results.forEach(row => {
            const kodePropinsi = row.kode_propinsi.padStart(2, '0');
            const namaPropinsi = propinsiMap[kodePropinsi] || kodePropinsi;

            if (!pivotMap[namaPropinsi]) {
                // Inisialisasi dengan properti terurut
                pivotMap[namaPropinsi] = {
                    propinsi: namaPropinsi,
                    total: 0,
                    CPIB: 0,
                    CBIB: 0,
                    CPPIB: 0,
                    CPOIB: 0,
                    CDOIB: 0,
                };
            }

            const izin = row.ur_izin_singkat;
            const jumlah = row.jumlah;

            if (pivotMap[namaPropinsi].hasOwnProperty(izin)) {
                pivotMap[namaPropinsi][izin] = jumlah;
                pivotMap[namaPropinsi].total += jumlah;

                // Tambahkan ke total rekap juga
                totalRekap[izin] += jumlah;
                totalRekap.total += jumlah;
            }
        });

        let pivotArray = Object.values(pivotMap);

        // Sort by total descending
        pivotArray.sort((a, b) => b.total - a.total);

        const limitedData =
            limitNumber && !isNaN(limitNumber)
                ? pivotArray.slice(0, limitNumber)
                : pivotArray;

        res.status(200).json({
            data: limitedData,
            rekap: totalRekap,
        });

    } catch (error) {
        console.error("Error fetching OSS Checklist Rekap:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};