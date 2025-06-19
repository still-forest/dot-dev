// tests/setup-node.ts
import { vi } from "vitest";

// Ensure Node.js globals are properly set up
global.process = global.process || {};

// Mock process.nextTick if it's missing
if (!global.process.nextTick) {
  global.process.nextTick = (callback: Function, ...args: any[]) => {
    setTimeout(() => callback(...args), 0);
  };
}

// Mock stdout/stderr fd properties for debug package
Object.defineProperty(process.stdout, "fd", {
  value: 1,
  writable: false,
  configurable: true,
});

Object.defineProperty(process.stderr, "fd", {
  value: 2,
  writable: false,
  configurable: true,
});

// Disable colors in debug output
process.env.DEBUG_COLORS = "false";
process.env.NO_COLOR = "1";

// Mock Next.js headers for API testing
vi.mock("next/headers", () => ({
  headers: vi.fn(() => ({
    get: vi.fn(),
    set: vi.fn(),
    has: vi.fn(),
    delete: vi.fn(),
    entries: vi.fn(() => []),
  })),
  cookies: vi.fn(() => ({
    get: vi.fn(),
    set: vi.fn(),
    has: vi.fn(),
    delete: vi.fn(),
  })),
}));

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  })),
  usePathname: vi.fn(() => "/"),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));
