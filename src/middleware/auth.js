// middleware/auth.js
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "super_long_random_access_secret_change_me";
const COOKIE_NAME = process.env.COOKIE_NAME || "token"; // harus sama dengan authSSO.js

export function verifyToken(req, res, next) {
  try {
    // 🔍 Ambil token dari cookie
    const token = req.cookies?.[COOKIE_NAME];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // ✅ Verifikasi token dengan secret yang sama
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // bisa diakses di controller (req.user.id, req.user.role)
    next();
  } catch (err) {
    console.error("❌ JWT verification error:", err.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}
