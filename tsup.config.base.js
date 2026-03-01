/** @param {string} [entry] */
export function createConfig(entry = "index.ts") {
  return {
    entry: [entry],
    format: ["cjs", "esm"],
    treeshake: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    bundle: true,
    dts: true,
  };
}
