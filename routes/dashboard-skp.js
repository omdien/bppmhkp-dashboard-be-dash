import express from "express";
import {
    getResumeSKP
} from "../controllers/dshSKPController.js";
const router = express.Router();

router.get("/resume-skp", getResumeSKP);

export default router;