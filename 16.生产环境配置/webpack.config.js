const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 定义nodejs环境变量：决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production';

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/buult.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => {
                resolve('postcss-preset-env')();
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        ues: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          // 还需要在package.json中定义browserslist
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => {
                resolve('postcss-preset-env')();
              },
            },
          },
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/built.css',
    }),
  ],
  mode: 'production',
};
