import tb_r_upt from "../models/common/tb_r_upt.js";

export const getUPTBPPMHKP = async () => {
    return tb_r_upt.findAll({
         where: {
              STS_AKTIF: 1,
            },
    });
};