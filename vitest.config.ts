import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig, type ViteUserConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@tests": resolve(__dirname, "./tests"),
    },
  },
  test: {
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["tests/**/*", "**/*.d.ts", "dist*/**", "*.config.ts", "*.setup.ts"],
    },
  },
  projects: [
    {
      name: "api",
      environment: "node",
      include: ["tests/api/**/*.test.ts"],
      setupFiles: ["./tests/setup-node.ts"], // Node-specific setup
    },
    {
      name: "frontend",
      environment: "jsdom",
      include: ["tests/components/**/*.test.tsx"],
      setupFiles: ["./tests/setup-msw.ts"], // Browser-specific setup
    },
  ],
} as ViteUserConfig);
