const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 定义nodejs环境变量：决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production';

// 复用loader
const commonCssLoader = [
  // MiniCssExtractPlugin作用，提取单独文件
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    // css兼容性处理
    // 还需要在package.json中定义browserslist
    // !!!版本不兼容 在项目目录添加 postcss-config.js文件
    loader: 'postcss-loader',
    // options: {
    //   ident: 'postcss',
    //   // eslint-disable-next-line global-require
    //   plugins: () => [require('postcss-preset-env')()],
    // },
  },
];

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/buult.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        // eslint  在package.json中eslintConfig --> airbnb
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      {
        // 以下loader只会匹配一个
        // 注意：不能有两个配置处理同一种类型文件
        oneOf: [
          {
            // css兼容性处理
            test: /\.css$/,
            use: [...commonCssLoader],
          },
          {
            // less兼容性处理
            test: /\.less$/,
            use: [...commonCssLoader, 'less-loader'],
          },
          /*
            * 正常来讲，一个文件只能被一个loader处理。
            * 当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序
            * 先执行eslint 再执行babel
            * */
          {
            // js兼容性处理
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env', // 只能做基本兼容
                  {
                    useBuiltIns: 'usage',
                    corejs: { version: 3 },
                    targets: {
                      edge: '17',
                      firefox: '60',
                      chrome: '67',
                      safari: '11.1',
                      ie: '9',
                    },
                  },
                ],
              ],
            },
          },
          {
            // 压缩图片
            test: /\.(jpg|png|gif)/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: '[hash:10].[ext]',
              outputPath: 'imgs',
              esModule: false,
            },
          },
          {
            // 处理html中的图片  !使用此loader必须把esModule关闭
            test: /\.html$/,
            loader: 'html-loader',
          },
          // 打包其他资源(除了html/js/css资源以外的资源)
          {
            // 排除css/js/html资源
            exclude: /\.(js|css|less|html|jpg|png|gif)/,
            loader: 'file-loader',
            options: {
              // 其他文件输出到media
              outputPath: 'media',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/built.css',
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin(),
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
  mode: 'production',
};
