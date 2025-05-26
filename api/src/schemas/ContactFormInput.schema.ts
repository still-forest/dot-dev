import type { NextFunction, Request, Response } from "express";
import validator from "validator";
import z from "zod";

const sanitizeString = (raw: unknown) => {
  if (typeof raw !== "string") return raw;
  return validator.escape(raw.trim().replace(/<[^>]*>/g, ""));
};

export const contactFormInputSchema = z
  .object({
    subject: z.preprocess(sanitizeString, z.string().min(1).max(100)),
    body: z.preprocess(sanitizeString, z.string().min(1).max(1000)),
  })
  .strict();

export const validateFormInputSchema = () => {
  const schema = contactFormInputSchema;
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      return res.status(400).json({
        message: "Validation failed",
        errors:
          error instanceof z.ZodError
            ? error.errors.map((err: z.ZodIssue) => ({
                field: err.path.join("."),
                message: err.message,
              }))
            : [],
      });
    }
  };
};
