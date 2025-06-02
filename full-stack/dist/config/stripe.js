"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/config/stripe.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // garante que as variáveis de .env estão carregadas
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-04-30.basil",
});
exports.default = stripe;
