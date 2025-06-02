// backend/src/controllers/productController.ts
import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { asyncHandler } from "../utils/asyncHandler";

// Listar todos os produtos
export const listProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

// Buscar um produto por ID
export const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    return res.status(404).json({ error: "Produto não encontrado" });
  }

  res.json(product);
});

// Criar um novo produto
export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, description, priceCents, sku } = req.body;

  const product = await prisma.product.create({
    data: { name, description, priceCents, sku },
  });

  res.status(201).json(product);
});

// Atualizar um produto existente
export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, priceCents, sku } = req.body;

  const product = await prisma.product.update({
    where: { id },
    data: { name, description, priceCents, sku },
  });

  res.json(product);
});

// Deletar um produto
export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.product.delete({ where: { id } });
  res.status(204).send();
});
