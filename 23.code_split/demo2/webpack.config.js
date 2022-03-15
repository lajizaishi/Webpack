const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 定义nodejs环境变量：决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production';

module.exports = {
  // 单入口
  // entry: './src/js/index.js',
  entry: {
    // 多入口: 有一个入口，最终输出就有一个bundle
    index: './src/js/index.js',
    test: './src/js/test.js',
  },
  output: {
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    // 功能：默认创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
    // 需求：需要有结构的HTML文件
    new HtmlWebpackPlugin({
      // 复制一个./src/index.html文件，并自动引入打包输出的所有资源（JS/CSS)
      template: './src/index.html',
      // 压缩html
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
  /*
  * 可以将node_modules中代码单独打包一个chunk最终输出
  * 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
  * */
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  mode: 'production',
};
