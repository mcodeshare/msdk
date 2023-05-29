/* 生产环境配置 */
import { nodeResolve } from "@rollup/plugin-node-resolve";
import json from 'rollup-plugin-json'
import typescript2 from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import pkg from "../package.json";
import { resolve, clearDir } from "./utils";
//NAME_SPACE:命名空间可通过windows.NAMESPACE使用库
const NAME_SPACE = pkg.name.toUpperCase();
const BUILD_TYPES = ["umd", "esm"];
/* 
BUILD_TYPES:
amd – 异步模块定义，用于像RequireJS这样的模块加载器
cjs – CommonJS，适用于 Node 和 Browserify/Webpack
esm – 将软件包保存为 ES 模块文件，在现代浏览器中可以通过 <script type=module> 标签引入
iife – 一个自动执行的功能，适合作为<script>标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
umd – 通用模块定义，以amd，cjs 和 iife 为一体
system - SystemJS 加载器格式 
*/
clearDir(resolve("./lib"));// 删除lib目录
const config = [];
BUILD_TYPES.forEach((type, index) => {
  const conf = {
    input: "src/index.ts",
    output: {
      name: NAME_SPACE,
      format: type,
      sourcemap: false,
      file: resolve(`../lib/index.${type}.js`),
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
      // 压缩代码
      terser(),
    ],
  };
  config.push(conf);
});

export default config;
