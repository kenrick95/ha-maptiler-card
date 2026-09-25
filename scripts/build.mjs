import { build } from "esbuild";

await build({
  entryPoints: ["src/ha-maptiler-card.js"],
  outfile: "dist/ha-maptiler-card.js",
  bundle: true,
  minify: true,
  format: "iife",
  target: ["es2020"],
  loader: { ".css": "text" },
  legalComments: "none"
});
