/* 开发环境配置 */
import { nodeResolve } from "@rollup/plugin-node-resolve";
import json from 'rollup-plugin-json'
import typescript2 from "rollup-plugin-typescript2";
import livereload from 'rollup-plugin-livereload'
import serve from "rollup-plugin-serve";
import pkg from "../package.json";
import { resolve, clearDir } from "./utils";
const NAME_SPACE = pkg.name.toUpperCase();
const BUILD_TYPES = ["umd"];
clearDir(resolve("./dist")); //删除dist目录
const config = [];
BUILD_TYPES.forEach((type, index) => {
  const conf = {
    input: "src/index.ts",
    output: {
      name: NAME_SPACE,
      format: type,
      sourcemap: true,
      file: resolve(`../dist/index.${type}.js`),
    },
    plugins: [
      // 告诉Rollup如何查找外部模块
      nodeResolve({
        extensions: [".js", ".ts"],
      }),
      // 项目中使用json
      json(),
      // typescript处理
      typescript2({
        tsconfig: resolve("../tsconfig.json"),
      }),
      // 项目热更新
      livereload()
    ],
  };
  if (index === 0) {
    conf.plugins.push(
      // 启动服务
      serve({
        port: 9106,
        contentBase: "",
        openPage: "/public/index.html",
        open: true,
      })
    )
  }
  config.push(conf);
});

export default config;
