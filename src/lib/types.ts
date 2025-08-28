export type Result<T> =
  | {
      success: true;
      data: T;
      error?: Error | null;
    }
  | {
      success: false;
      error: Error;
      data?: T;
    };
