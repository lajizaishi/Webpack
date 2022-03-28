/*
    ldader: 1. 下载 2. 使用（配置loader）
    plugins: 1. 下载 2. 引入 3. 使用
 */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 入口
  entry: './src/js/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    // loader的配置
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 复制一个./src/index.html文件，并自动引入打包输出的所有资源（JS/CSS)
      template: './index.html',
    }),
  ],
  mode: 'production',
  externals: {
    // 忽略jQuery被打包进来
    jquery: 'jQuery',
  },
};
