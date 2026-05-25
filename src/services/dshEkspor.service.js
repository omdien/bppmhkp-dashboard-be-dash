import {
  getSummaryEksporRepo,
  getEksporHarianRepo,
  getEksporBulananRepo,
} from "../repositories/ekspor.repository.js";

export const getSummaryEksporService = (params) => getSummaryEksporRepo(params);
export const getEksporHarianService  = (params) => getEksporHarianRepo(params);
export const getEksporBulananService = (params) => getEksporBulananRepo(params);