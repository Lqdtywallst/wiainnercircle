"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireInternalAuth = requireInternalAuth;
const config_js_1 = require("./config.js");
function requireInternalAuth(req, res, next) {
    if (!config_js_1.config.internalSecret) {
        res.status(503).json({ ok: false, error: "INTERNAL_SECRET not configured" });
        return;
    }
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : "";
    if (!token || token !== config_js_1.config.internalSecret) {
        res.status(401).json({ ok: false, error: "Unauthorized" });
        return;
    }
    next();
}
