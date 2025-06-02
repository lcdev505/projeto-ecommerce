// backend/src/routes/paymentRoutes.ts
import express from "express";
import { handleWebhook } from "../controllers/paymentController";

const router = express.Router();

router.post("/", handleWebhook);

export default router;
