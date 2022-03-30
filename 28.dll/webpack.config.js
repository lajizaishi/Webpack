/*
    ldader: 1. 下载 2. 使用（配置loader）
    plugins: 1. 下载 2. 引入 3. 使用
 */
const path = require('path');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
  // 入口
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    // 告诉webpack哪些库不参与打包，同时使用时的名称也待变~
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, 'dll/manifest.json'),
    }),
    // 将某个文件打包输出出去，并在html中自动引入该资源
    new AddAssetHtmlWebpackPlugin({
      // filepath: resolve(__dirname, 'dll/jquery.js'),
      filepath: require.resolve(path.resolve(__dirname, 'dll/jquery.js')),
    }),
  ],

  mode: 'production',
};
