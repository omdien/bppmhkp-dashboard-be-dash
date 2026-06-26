import * as Repo from "../repositories/common.repository.js";

// Get UPT BPPMHKP aktif
export const getUPTBPPMHKP = async () => {
  return await Repo.getUPTBPPMHKP();
};