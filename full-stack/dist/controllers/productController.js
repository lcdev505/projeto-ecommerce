"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProducts = listProducts;
exports.getProduct = getProduct;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
const prisma_1 = require("../config/prisma");
// Listar todos os produtos
async function listProducts(req, res) {
    const products = await prisma_1.prisma.product.findMany();
    res.json(products);
}
// Buscar um produto por ID
async function getProduct(req, res) {
    const { id } = req.params;
    const product = await prisma_1.prisma.product.findUnique({ where: { id } });
    if (!product) {
        res.status(404).json({ error: "Produto não encontrado" });
        return;
    }
    res.json(product);
}
// Criar um novo produto
async function createProduct(req, res) {
    const { name, description, priceCents, sku } = req.body;
    const product = await prisma_1.prisma.product.create({
        data: { name, description, priceCents, sku },
    });
    res.status(201).json(product);
}
// Atualizar um produto existente
async function updateProduct(req, res) {
    const { id } = req.params;
    const { name, description, priceCents, sku } = req.body;
    try {
        const product = await prisma_1.prisma.product.update({
            where: { id },
            data: { name, description, priceCents, sku },
        });
        res.json(product);
    }
    catch {
        res.status(404).json({ error: "Produto não encontrado" });
    }
}
// Deletar um produto
async function deleteProduct(req, res) {
    const { id } = req.params;
    try {
        await prisma_1.prisma.product.delete({ where: { id } });
        res.status(204).send();
    }
    catch {
        res.status(404).json({ error: "Produto não encontrado" });
    }
}
