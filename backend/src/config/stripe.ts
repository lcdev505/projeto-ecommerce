// backend/src/config/stripe.ts
import dotenv from "dotenv";
dotenv.config();  // garante que as variáveis de .env estão carregadas

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export default stripe;
