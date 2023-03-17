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

// import pkg from "./package.json";

export default {
  input: "./src/main.ts", // 打包入口
  output: {
    // 打包出口
    file: "./bin/main.js", // 最终打包出来的文件路径和文件名，这里是在package.json的browser: 'dist/index.js'字段中配置的
    format: "cjs", // umd是兼容amd/cjs/iife的通用打包格式，适合浏览器
  },
  plugins: [
    // 打包插件
    babel({ babelHelpers: "bundled" }),
    cleandir("./dist"),
    nodeResolve({ preferBuiltins: true, browser: true }),
    // nodeResolve(),
    // 查找和打包node_modules中的第三方模块
    commonjs(),
    // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
    typescript(),
    // 解析TypeScript
    json(),
    terser(),
  ],
  external: ["node_modules/**"],
};
