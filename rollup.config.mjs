/**
 * @type { import('rollup').RollupOptions }
 */
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import { cleandir } from "rollup-plugin-cleandir";
import terser from "@rollup/plugin-terser";
import { babel } from "@rollup/plugin-babel";
import esbuild from "rollup-plugin-esbuild";
import externals from "rollup-plugin-node-externals";

// eslint-disable-next-line no-undef
const isProduction = process.env.NODE_ENV === "production";

export default {
  input: "./src/main.ts",

  output: {
    // 打包出口
    dir: "./dist/",
    format: "cjs",
  },

  plugins: [
    // 打包插件
    cleandir("./dist"),
    json(),
    typescript(),
    babel({
      babelHelpers: "bundled",
    }),
    nodeResolve({ preferBuiltins: true }),
    externals({ devDeps: false }),
    commonjs(),
    esbuild(),
    isProduction && terser(),
  ],
};
