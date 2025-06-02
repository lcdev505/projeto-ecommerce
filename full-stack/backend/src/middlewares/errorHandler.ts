// backend/src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error("Erro capturado pelo middleware:", err);
  res.status(err.statusCode || 500).json({
    error: err.message || "Erro interno no servidor",
  });
}
