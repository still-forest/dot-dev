import { AxiosError } from "axios";

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

export class UnknownNetworkError extends AxiosError {
  constructor(error: AxiosError) {
    const message = `${error.code}: ${error.message}`;
    super(message);
    this.name = "UnknownNetworkError";
  }
}
