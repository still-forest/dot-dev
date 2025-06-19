import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig, type ViteUserConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@tests": resolve(__dirname, "./tests"),
    },
  },
  projects: [
    {
      name: "api",
      plugins: [tsconfigPaths(), react()],
      resolve: {
        alias: {
          "@": resolve(__dirname, "./src"),
          "@tests": resolve(__dirname, "./tests"),
        },
      },
      test: {
        globals: true,
        environment: "node",
        include: ["tests/api/**/*.{test,spec}.{ts,js}"],
        setupFiles: ["./tests/setup-node.ts"],
      },
    },
    {
      name: "components",
      plugins: [tsconfigPaths(), react()],
      resolve: {
        alias: {
          "@": resolve(__dirname, "./src"),
          "@tests": resolve(__dirname, "./tests"),
        },
      },
      test: {
        globals: true,
        environment: "jsdom",
        include: ["tests/components/**/*.{test,spec}.{tsx,jsx}"],
        setupFiles: ["./tests/setup-frontend.ts"],
        coverage: {
          provider: "v8",
          reporter: ["text", "json", "html"],
          exclude: ["tests/**/*", "**/*.d.ts", "dist*/**", "*.config.ts", "*.setup.ts"],
        },
      },
    },
  ],
} as ViteUserConfig);
