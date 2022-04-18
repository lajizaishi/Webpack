const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      /*
                !!!!!!!版本    "eslint-loader": "^4.0.2",      "eslint": "^7.32.0",

                语法检查：eslint-loader eslint
                    注意：只检查自己写的源代码，第三方的库是不用检查的
                    设置检查规则：
                    package.json中eslintConfig中设置~
                     "eslintConfig": {
                        "extends": "airbnb-base"
                      }
                    airbnb --> eslint-config-airbnb-base eslint-plugin-import eslint
                    下载 npm i eslint-loader eslint eslint-config-airbnb-base eslint-plugin-import -D

                    黄色警告类似：
                    5:1  warning  Unexpected console statement  no-console
                    ✖ 1 problem (0 errors, 1 warning)
                    可以在package.json的 "eslintConfig": {}里加 关闭console校验
                    "rules": {
                      "no-console":"off"
                    } 进行关闭
            */
      {
        test: /\.js$/,
        // 排除node_modules
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // 自动修复eslint的错误
          fix: true,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'development',
};
