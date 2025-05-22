import { resolve } from "node:path";
import svgr from "@svgr/rollup";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, type ViteUserConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@root": resolve(__dirname, "./"),
      "@tests": resolve(__dirname, "./tests"),
      "@stories": resolve(__dirname, "./stories"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
  },
} as ViteUserConfig);
