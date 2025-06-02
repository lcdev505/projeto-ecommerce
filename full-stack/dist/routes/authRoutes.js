"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/routes/authRoutes.ts
const express_1 = require("express");
const oauth_1 = require("../config/oauth");
const router = (0, express_1.Router)();
router.post("/token", oauth_1.oauth.token());
router.get("/secure", oauth_1.oauth.authenticate(), (req, res) => {
    res.json({ message: "Acesso autorizado!" });
});
exports.default = router;
