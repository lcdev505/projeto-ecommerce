// backend/src/controllers/authController.ts
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerSchema, loginSchema } from "../schemas/userSchemas";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Registro de usuário
export const register = asyncHandler(async (req: Request, res: Response) => {
  // Validação de input com Zod
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400);
    throw new Error(parsed.error.errors.map(e => e.message).join(", "));
  }
  const { email, password, name } = parsed.data;

  // Verifica se usuário já existe
  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    res.status(409);
    throw new Error("Usuário já existe");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name },
  });

  res.status(201).json({ id: user.id, email: user.email, name: user.name });
});

// Login de usuário
export const login = asyncHandler(async (req: Request, res: Response) => {
  // Validação de input com Zod
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400);
    throw new Error(parsed.error.errors.map(e => e.message).join(", "));
  }
  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.status(401);
    throw new Error("Credenciais inválidas");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Credenciais inválidas");
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

// Logout (opcional)
export const logout = (req: Request, res: Response) => {
  // Se usar cookies, limpar aqui
  res.json({ message: "Logout realizado com sucesso" });
};
