import type { Request, Response, NextFunction } from "express";
import { config } from "./config.js";

export function requireInternalAuth(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (!config.internalSecret) {
    res.status(503).json({ ok: false, error: "INTERNAL_SECRET not configured" });
    return;
  }

  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";

  if (!token || token !== config.internalSecret) {
    res.status(401).json({ ok: false, error: "Unauthorized" });
    return;
  }

  next();
}
