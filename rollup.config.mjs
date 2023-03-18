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
    // clear the out time output files
    cleandir("./dist"),
    // transform the json to es6
    json(),
    // transform the typescript to es6
    typescript(),
    // use babel to compile the es6
    babel({
      babelHelpers: "bundled",
    }),
    // find my node dependencies
    nodeResolve({ preferBuiltins: true }),
    // external the dev dependencies
    externals({ devDeps: false }),
    // find the modules were write by commonjs
    commonjs(),
    // use esbuild to package
    esbuild(),
    // use terser to compression when we build production
    isProduction && terser(),
  ],
};
