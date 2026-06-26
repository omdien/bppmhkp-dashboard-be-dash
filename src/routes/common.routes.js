import express from "express";
import {
  getUPTBPPMHKP
} from "../controllers/dshCommon.controller.js";

const router = express.Router();

router.get("/upt-bppmhkp", getUPTBPPMHKP);

export default router;