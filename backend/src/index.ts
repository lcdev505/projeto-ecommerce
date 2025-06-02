import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();

// Stripe Webhook: precisa vir antes do express.json()
app.use("/webhooks", express.raw({ type: "application/json" }), paymentRoutes);

// Parsing JSON
app.use(express.json());

// Test route
app.get("/", (req: Request, res: Response) => {
  res.send("Olá, Ecommerce API está no ar!");
});

app.use("/oauth", authRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);

// Error middleware
app.use(errorHandler);
// Depois de registrar todas as rotas e antes do app.listen

console.log("── Rotas registradas ───────────");
app._router.stack
  .filter((layer: any) => layer.route && layer.route.path)
  .forEach((layer: any) => {
    const methods = Object.keys(layer.route.methods)
      .map(m => m.toUpperCase())
      .join(", ");
    console.log(methods, layer.route.path);
  });
console.log("────────────────────────────────");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
