import type { AxiosError } from "axios";

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
  }
}

export class TooManyRequestsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TooManyRequestsError";
  }
}

export class InternalServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InternalServerError";
  }
}

export class UnknownNetworkError extends Error {
  constructor(error: AxiosError) {
    const code = error.code ?? String(error.response?.status ?? "UNKNOWN");
    const message = `[${code}] ${error.message}`;
    super(message, { cause: error });
    this.name = "UnknownNetworkError";
  }
}
