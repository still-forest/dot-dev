import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { server } from "./support/server";

vi.stubGlobal("process", {
  env: {
    NODE_ENV: "test",
  },
});

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  vi.clearAllMocks();
  server.close();
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
