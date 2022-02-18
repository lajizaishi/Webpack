const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
    environment: {
      arrowFunction: false,
    },
  },
  module: {
    rules: [
      /*
        window11 调试ie
        edge 设置默认浏览器
        1 开启 允许在 Internet Explorer 模式下重新加载网站
        2 Internet Explorer 模式页面 添加所要测试的网页
        3 win + r 输入 %systemroot%\system32\f12\IEChooser.exe 打开控制台
          js兼容处理：babel-loader @babel/core @babel/preset-env
            1.基本js兼容性处理 --> @babel/preset-env
              问题：只能转换基本语法，如promise高级语法不能转换
            2.全部js兼容性处理 --> @babel/poltfill
              遇到的问题: js文件引入import '@babel/polyfill';打包文件默认输出形式是箭头函数
              解决办法: 需要把箭头函数关闭掉
                  environment: {
                    arrowFunction: false,
                  },
              问题：需求只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了~
            3.按需加载 --> core-js
        */
      {
        test: /\.js$/,
        // 排除node_modules
        exclude: /node_modules/,
        loader: 'babel-loader',
        // 预设：指示bable做怎么样的兼容性处理
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  edge: '17',
                  firefox: '60',
                  chrome: '67',
                  safari: '11.1',
                  ie: '11',
                },
                useBuiltIns: 'usage',
              },
            ],
          ],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  // mode: 'development',
  mode: 'production',
};
