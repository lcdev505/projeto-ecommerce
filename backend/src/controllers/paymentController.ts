// backend/src/controllers/paymentController.ts

import { Request, Response } from "express";
import stripe from "../config/stripe";
import asyncHandler from "express-async-handler";

export const handleWebhook = asyncHandler(async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Trate eventos aqui conforme necessário, ex:
  // if (event.type === "payment_intent.succeeded") { ... }

  res.json({ received: true });
});
