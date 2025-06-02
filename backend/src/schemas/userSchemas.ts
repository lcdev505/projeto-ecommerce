// backend/src/schemas/userSchemas.ts
import { z } from "zod";

// Para registro de usuário
export const registerSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "Senha deve ter ao menos 6 caracteres" }),
  name: z.string().min(1, { message: "Nome é obrigatório" }),
});

// Para login de usuário
export const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(1, { message: "Senha é obrigatória" }),
});
