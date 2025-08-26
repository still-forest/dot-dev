export class RateLimitError extends Error {
  constructor() {
    super("You are sending messages too quickly. Please try again later.");
  }
}
