import ts from 'rollup-plugin-typescript2' // 解析 ts 的插件
import {nodeResolve} from '@rollup/plugin-node-resolve' // 解析第三方 模块的插件

import serve from 'rollup-plugin-serve' // 启动本地服务的插件
import path from 'path'

// rollup 支持 es6 的语法,可以直接 import
export default {
  input: 'src/index.ts',
  output: {
    format: 'iife', // 立即执行 自执行函数
    file: path.resolve('dist/bundle.js'), // 出口文件
    sourcemap: true, //根据源码产生映射文件
  },
  plugins: [
    nodeResolve({
      extensions: ['.js', '.ts']
    }),
    ts({
      tsconfig: path.resolve('tsconfig.json') // 表示项目中使用的 ts 配置文件
    }),
    serve({
      openPage: '/public/index.html',
      contentBase: '',// 表示以当前文件为入口, 给个空,不给值会报错
      port: 8080, // 启动服务端口号
      open: true, // 默认打开浏览器

    })
  ]
}
