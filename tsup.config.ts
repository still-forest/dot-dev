import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["server/index.ts"], // adjust to your entry point
  format: ["esm"],
  target: "node18",
  outDir: "dist-server",
  clean: true,
  sourcemap: true,
  minify: false, // keep false for easier debugging
});
