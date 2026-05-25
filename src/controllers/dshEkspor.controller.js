import {
    getSummaryEksporService,
    getEksporHarianService,
    getEksporBulananService,
} from "../services/dshEkspor.service.js";

export const getSummaryEkspor = async (req, res) => {
    try {
        const { kdUpt, tglAwal, tglAkhir } = req.params;
        const { negara = "", upt = "", komoditas = "" } = req.query;

        const result = await getSummaryEksporService({
            kdUpt, tglAwal, tglAkhir, negara, upt, komoditas,
        });

        res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const getEksporHarian = async (req, res) => {
    try {
        const { kdUpt, tglAwal, tglAkhir } = req.params;
        const { negara = "", upt = "", komoditas = "" } = req.query;

        const result = await getEksporHarianService({
            kdUpt, tglAwal, tglAkhir, negara, upt, komoditas,
        });

        res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const getEksporBulanan = async (req, res) => {
    try {
        const { kdUpt, tglAwal, tglAkhir } = req.params;
        const { negara = "", upt = "", komoditas = "" } = req.query;

        const result = await getEksporBulananService({
            kdUpt, tglAwal, tglAkhir, negara, upt, komoditas,
        });

        res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "Internal server error" });
    }
};