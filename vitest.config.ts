import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vitest/config";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: "**/*.svg",
    }),
  ],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: ["node_modules", "dist", ".next", "coverage"],
    globals: true,
    env: {
      APP_ENV: "test",
    },
  },
  resolve: {
    alias: {
      "@": resolve(rootDir, "./src"),
      "@tests": resolve(rootDir, "./tests"),
      "~": resolve(rootDir, "./"),
    },
  },
});
