// backend/src/routes/authRoutes.ts

import express from "express";
import { register, login, logout } from "../controllers/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout); // opcional, dependendo do frontend

export default router;
