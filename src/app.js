import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import dshEksporRoute from "./routes/ekspor.routes.js";
import dshPrimerRoute from "./routes/primer.route.js";
import dashboardSKPRoute from "./routes/skp.routes.js";
import smkhpRoutes from "./routes/analytics/smkhpRoutes.js";
import haccpRoutes from "./routes/haccp.route.js";

const app = express();

/* =========================
 * CORS CONFIG (MULTI ORIGIN)
 * ========================= */
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",")
  : ["http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    // allow Postman / server to server
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.error("CORS BLOCKED ORIGIN:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

/* =========================
 * GLOBAL MIDDLEWARE
 * ========================= */
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

/* =========================
 * ROUTES
 * ========================= */
app.use("/api/dashboard/ekspor", dshEksporRoute);
app.use("/api/dashboard/primer", dshPrimerRoute);
app.use("/api/dashboard/skp", dashboardSKPRoute);
app.use("/api/dashboard/analytics/smkhp", smkhpRoutes);
app.use("/api/dashboard/haccp", haccpRoutes);

/* =========================
 * CORS ERROR HANDLER
 * ========================= */
app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      message: "CORS blocked this origin",
    });
  }
  next(err);
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "dashboard-skp",
    time: new Date().toISOString(),
  });
});

export default app;
