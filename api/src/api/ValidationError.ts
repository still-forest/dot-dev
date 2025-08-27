import type { ZodIssue } from "zod";

export class ValidationError extends Error {
  errors: ZodIssue[];

  constructor(message: string, errors: ZodIssue[]) {
    super(message);
    this.errors = errors;
  }

  toJSON() {
    return {
      message: this.message,
      errors: this.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    };
  }
}
