// src/controllers/dshPrimer.controller.js
import * as service from "../services/dshPrimer.service.js";

export const rekapIzinPrimer = async (req, res, next) => {
  try {
    const result = await service.rekapIzinPrimer(req.query);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const propinsiPerIzin = async (req, res, next) => {
  try {
    const { startDate, endDate, kdIzin } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ msg: "Start date and end date are required." });
    }

    if (!kdIzin || !/^\d{12}$/.test(kdIzin)) {
      return res.status(400).json({ msg: "kd_izin is required and must be 12 digits." });
    }

    const data = await service.getPropinsiPerIzin(req.query);

    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

