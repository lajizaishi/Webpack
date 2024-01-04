const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/[name].[contenthash:10]js',
    path: resolve(__dirname, 'build'),
    chunkFilename: 'js/[name].[contenthash:10]_chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  mode: 'production',
  resolve: {
    alias: {
      $css: resolve(__dirname, 'src/css'),
    },
    extensions: ['.js', '.json', '.css'],
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      // 默认值，可以不写~
      /* minSize: 30 * 1024, // 分割chunk最小为30kb
      maxSiza: 0, // 最大没有限制
      minChunks: 1, // 要提取的chunk最少被引用1次
      maxAsyncRequests: 5, // 按需加载时并行加载的文件最大数量
      maxInitialRequests: 3, // 入口js最大并行请求数量
      automaticNameDelimiter: '~', // 名称连接符
      name: true, // 可以使用命名规则
      cacheGroups: { // 分割chunk的组
        // node_modules文件会被打包到 vendors 组的chunk中
        // 满足上面的公共规则，如： 大小超过30kb，至少被引用一次。
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          // 要提取的chunk最少被引用2次
          minChunks: -20,
          // 如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新打包模块
          reuseExistingChunk: true,
        },
      }, */
    },
    // 将当前模块的记录其他模块的hash单独打包成一个文件 runtime
    // 解决： 修改a文件导致b文件的contenthash变化
    runtimeChunk: {
      name: (entrypoint) => `reuntime-${entrypoint.name}`,
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // 开启多进程打包
        parallel: true,
      }),
    ],
  },
  // 报错提示
  devtool: 'source-map',
  // 开启缓存
  cache: {
    type: 'filesystem',
  },
};
