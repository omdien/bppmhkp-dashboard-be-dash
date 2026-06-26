import * as CommonService from "../services/dshCommon.service.js";

/* ============================================================
 🔹 Get UPT BPPMHKP
 ============================================================ */
export const getUPTBPPMHKP = async (req, res) => {
  try {
    const result = await CommonService.getUPTBPPMHKP();

    return res.status(200).json({
      success: true,
      message: "Data UPT BPPMHKP berhasil diambil",
      data: result,
    });
  } catch (error) {
    console.error("getUPTBPPMHKP:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Terjadi kesalahan pada server",
    });
  }
};