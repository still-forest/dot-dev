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
  projects: [
    {
      name: "api",
      environment: "node",
      include: ["tests/api/**/*.test.ts"],
    },
    {
      name: "components",
      environment: "jsdom",
      include: ["tests/components/**/*.test.tsx"],
      setupFiles: ["./tests/setup-msw.ts"],
    },
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["tests/**/*", "**/*.d.ts", "dist*/**", "*.config.ts", "*.setup.ts"],
    },
  },
} as ViteUserConfig);
