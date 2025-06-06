import { resolve } from "node:path";
import svgr from "@svgr/rollup";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, type ViteUserConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@tests": resolve(__dirname, "./tests"),
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
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
