"use strict";
// backend/src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes")); // ← importe aqui
// 1. Carrega variáveis de ambiente de .env
dotenv_1.default.config();
const app = (0, express_1.default)();
// 2. Habilita parsing de JSON no corpo das requisições
app.use(express_1.default.json());
// 3. Rota de teste rápida
app.get("/", (req, res) => {
    res.send("Olá, Ecommerce API está no ar!");
});
// 4. Rotas de autenticação OAuth2
app.use("/oauth", authRoutes_1.default);
// 5. Rota de webhooks do Stripe
app.use("/webhooks", paymentRoutes_1.default);
// 6. Rota de CRUD de produtos
app.use("/products", productRoutes_1.default); // ← monte o router aqui
// 7. Sobe o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
