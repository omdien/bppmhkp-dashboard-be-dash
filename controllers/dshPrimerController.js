import { Sequelize } from "sequelize";
import { db_mutu, db_kapal } from "../config/Database.js";
import Tb_propinsi from "../models/tb_propinsi.js";

export const rekap_izin_primer = async (req, res) => {
    try {
        const { startDate, endDate, limit } = req.query;

        const start = startDate ? `${startDate} 00:00:00` : "2024-01-01 00:00:00";
        const end = endDate ? `${endDate} 23:59:59` : "2024-12-31 23:59:59";
        const limitNumber = limit ? parseInt(limit) : null;

        /* ---------- 1. Query OSS (pakai db_mutu) ---------- */
        const queryOSS = `
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

        const ossResults = await db_mutu.query(queryOSS, {
            replacements: { start, end },
            type: Sequelize.QueryTypes.SELECT,
        });

        /* ---------- 2. Query CBIB Kapal (pakai db_kapal) ---------- */
        const queryCBIBKapal = `
      SELECT 
        nama_provinsi AS propinsi,
        COUNT(*) AS jumlah
      FROM tb_cbib_kapal
      WHERE tgl_terbit BETWEEN :start AND :end
      GROUP BY nama_provinsi
    `;

        const cbibKapalResults = await db_kapal.query(queryCBIBKapal, {
            replacements: { start, end },
            type: Sequelize.QueryTypes.SELECT,
        });

        /* ---------- 3. Mapping Provinsi ---------- */
        const propinsiList = await Tb_propinsi.findAll();
        const propinsiMap = {};
        propinsiList.forEach((p) => {
            const kode = p.KODE_PROPINSI.toString().padStart(2, "0");
            propinsiMap[kode] = p.URAIAN_PROPINSI;
        });

        /* ---------- 4. Inisialisasi Pivot ---------- */
        const pivotMap = {};
        const totalRekap = {
            CPIB: 0,
            CBIB: 0,
            CPPIB: 0,
            CPOIB: 0,
            CDOIB: 0,
            CBIB_Kapal: 0,
            total: 0,
        };

        /* ---------- 5. Isi dari OSS ---------- */
        ossResults.forEach((row) => {
            const kodePropinsi = row.kode_propinsi.padStart(2, "0");
            const namaPropinsi = propinsiMap[kodePropinsi] || kodePropinsi;

            if (!pivotMap[namaPropinsi]) {
                pivotMap[namaPropinsi] = {
                    propinsi: namaPropinsi,
                    total: 0,
                    CPIB: 0,
                    CBIB: 0,
                    CPPIB: 0,
                    CPOIB: 0,
                    CDOIB: 0,
                    CBIB_Kapal: 0,
                };
            }

            const izin = row.ur_izin_singkat;
            const jumlah = row.jumlah;

            if (pivotMap[namaPropinsi].hasOwnProperty(izin)) {
                pivotMap[namaPropinsi][izin] += jumlah;
                pivotMap[namaPropinsi].total += jumlah;

                totalRekap[izin] += jumlah;
                totalRekap.total += jumlah;
            }
        });

        /* ---------- 6. Tambah CBIB Kapal (pakai db_kapal) ---------- */
        cbibKapalResults.forEach((row) => {
            const namaPropinsi = row.propinsi?.trim();

            if (!pivotMap[namaPropinsi]) {
                pivotMap[namaPropinsi] = {
                    propinsi: namaPropinsi,
                    total: 0,
                    CPIB: 0,
                    CBIB: 0,
                    CPPIB: 0,
                    CPOIB: 0,
                    CDOIB: 0,
                    CBIB_Kapal: 0,
                };
            }

            pivotMap[namaPropinsi].CBIB_Kapal += row.jumlah;
            pivotMap[namaPropinsi].total += row.jumlah;

            totalRekap.CBIB_Kapal += row.jumlah;
            totalRekap.total += row.jumlah;
        });

        /* ---------- 7. Sort & Limit ---------- */
        let pivotArray = Object.values(pivotMap);
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
        console.error("Error fetching Rekap Izin Primer:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const propinsi_per_izin = async (req, res) => {
  try {
    const { startDate, endDate, kdIzin, limit } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ msg: "Start date and end date are required." });
    }

    if (!kdIzin || !/^\d{12}$/.test(kdIzin)) {
      return res.status(400).json({ msg: "kd_izin is required and must be 12 digits." });
    }

    const izinKapal = "032000000033"; // CPIB Kapal
    const limitNum = limit ? parseInt(limit, 10) : null;

    let data = [];

    // CASE 1 → OSS
    if (kdIzin !== izinKapal) {
      const dataQry = `
        SELECT
          COUNT(a.id_izin) AS Jumlah,
          c.URAIAN_PROPINSI
        FROM mutu.tr_oss_checklist a
        JOIN hc.tb_propinsi c 
          ON c.KODE_PROPINSI = SUBSTRING(a.kd_daerah, 1, 2)
        WHERE a.sts_aktif = '1'
          AND a.status_checklist = '50'
          AND a.tgl_izin BETWEEN :startDate AND :endDate
          AND a.kd_izin = :kdIzin
        GROUP BY c.URAIAN_PROPINSI
        ORDER BY Jumlah DESC
        ${limitNum ? "LIMIT :limit" : ""}
      `;

      const replacements = { startDate, endDate, kdIzin };
      if (limitNum) replacements.limit = limitNum;

      data = await db_mutu.query(dataQry, {
        replacements,
        type: Sequelize.QueryTypes.SELECT,
      });
    }
    // CASE 2 → Kapal
    else {
      const kapalQry = `
        SELECT 
          nama_provinsi AS URAIAN_PROPINSI,
          COUNT(*) AS Jumlah
        FROM tb_cbib_kapal
        WHERE tgl_terbit BETWEEN :startDate AND :endDate
        GROUP BY nama_provinsi
        ORDER BY Jumlah DESC
        ${limitNum ? "LIMIT :limit" : ""}
      `;

      const replacements = { startDate, endDate };
      if (limitNum) replacements.limit = limitNum;

      data = await db_kapal.query(kapalQry, {
        replacements,
        type: Sequelize.QueryTypes.SELECT,
      });
    }

    if (!data || data.length === 0) {
      return res.status(200).json({
        success: true,
        msg: "Data not found for given parameters.",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      data,
    });

  } catch (error) {
    console.error("Error fetching propinsi_per_izin:", error);
    res.status(500).json({
      success: false,
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};


