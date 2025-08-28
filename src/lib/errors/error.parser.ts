import { AxiosError } from "axios";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  TooManyRequestsError,
  UnknownNetworkError,
} from "./types";

export type MaybeError = Error | string;

const parseAxiosError = (error: AxiosError) => {
  const { status } = error;

  if (status === 400) {
    return new BadRequestError(error.message);
  }

  if (status === 404) {
    return new NotFoundError(error.message);
  }

  if (status === 429) {
    return new TooManyRequestsError(error.message);
  }

  if (status && status >= 500) {
    return new InternalServerError(error.message);
  }

  return new UnknownNetworkError(error);
};

export const parseError = (error: MaybeError): Error => {
  if (error instanceof AxiosError) {
    return parseAxiosError(error);
  }

  if (typeof error === "string") {
    return new Error(error);
  }

  return error;
};
