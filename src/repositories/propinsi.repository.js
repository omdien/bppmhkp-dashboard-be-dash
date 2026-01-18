// src/repositories/propinsi.repository.js
import Tb_propinsi from "../models/tb_propinsi.js";

export const getAllPropinsiMap = async () => {
  const rows = await Tb_propinsi.findAll();

  const map = {};
  rows.forEach((p) => {
    map[p.KODE_PROPINSI.toString().padStart(2, "0")] = p.URAIAN_PROPINSI;
  });

  return map;
};
