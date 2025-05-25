import path from "node:path";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "node22",
  clean: true,
  sourcemap: true,
  minify: true,
  esbuildOptions(options) {
    options.alias = {
      "@": path.resolve(__dirname, "src"),
    };
  },
});
