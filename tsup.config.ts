import path from "node:path";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["server/index.ts"],
  format: ["esm"],
  target: "node22",
  outDir: "dist-server",
  clean: true,
  sourcemap: true,
  minify: true,
  esbuildOptions(options) {
    options.alias = {
      "@server": path.resolve(__dirname, "server"),
    };
  },
});
