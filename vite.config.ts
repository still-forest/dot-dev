import { resolve } from "node:path";
import svgr from "@svgr/rollup";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, type ViteUserConfig } from "vitest/config";

export default defineConfig({
  build: {
    outDir: "./dist-client",
    rollupOptions: {
      external: ["server/**/*"],
    },
  },
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@root": resolve(__dirname, "./"),
      "@server": resolve(__dirname, "./server"),
      "@tests": resolve(__dirname, "./tests"),
      "@stories": resolve(__dirname, "./stories"),
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "server/index.ts",
        "server/services/logger.service.ts",
        "server/middleware/*",
        "tests/**/*",
        "**/*.d.ts",
        "dist*/**",
        "*.config.ts",
        "*.setup.ts",
      ],
    },
  },
} as ViteUserConfig);
