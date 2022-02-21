/*
    ldader: 1. 下载 2. 使用（配置loader）
    plugins: 1. 下载 2. 引入 3. 使用
 */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 入口
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    // loader的配置
  },
  plugins: [
    // plugins的配置
    // html-webpack-plugin
    // 功能：默认创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
    // 需求：需要有结构的HTML文件
    new HtmlWebpackPlugin({
      // 复制一个./src/index.html文件，并自动引入打包输出的所有资源（JS/CSS)
      template: './src/index.html',
    }),
  ],
  mode: 'development',
};
