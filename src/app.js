import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import dshEksporRoute from "./routes/ekspor.routes.js";
import dshPrimerRoute from "./routes/primer.route.js";
import dashboardSKPRoute from "./routes/skp.routes.js";
import smkhpRoutes from "./routes/analytics/smkhpRoutes.js";

import { verifyToken } from "./middleware/auth.js";

const app = express();

// Middleware global
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3001",
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/dashboard/ekspor", dshEksporRoute);
app.use("/api/dashboard/primer", verifyToken, dshPrimerRoute);
app.use("/api/dashboard/skp", dashboardSKPRoute);
app.use("/api/dashboard/analytics/smkhp", smkhpRoutes);

export default app;
