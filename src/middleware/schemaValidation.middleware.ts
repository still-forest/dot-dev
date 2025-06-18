import type { NextFunction, Request, Response } from "express";
import z from "zod";

export const validateInputSchema = (schema: z.ZodSchema<unknown>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Validation failed",
          errors: error.errors.map((err: z.ZodIssue) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      } else {
        next(error);
      }
    }
  };
};
