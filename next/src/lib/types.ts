interface HandledResponse<T> {
  success: true;
  data: T;
}

interface UnhandledResponse<_T> {
  success: false;
  error: Error;
}

export type Response<T> = HandledResponse<T> | UnhandledResponse<T>;
