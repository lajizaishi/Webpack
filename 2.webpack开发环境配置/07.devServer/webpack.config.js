const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    // 入口
    entry: './src/index.js',
    // 输出1
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // 打包css
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // 打包其他资源(除了html/js/css资源以外的资源)
            {
                // 排除css/js/html资源
                exclude: /\.(css|js|html|less)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]'
                }
            }
        ]
    },
    plugins: [
        // 创建html 并且把js引入
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',

    // 开发服务器 devServer；用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~~）
    // 特点：只会在内存中编译打包，不会有任何输出
    // 启动devSercer指令为：npx webpack-dev-server
    devServer: {
        // webpack老版本写法
        // contentBase: resolve(__dirname,'build'),
        // webpack新版本写法
        static: {
            directory: path.join(__dirname,'build')},
        // 启动gzip压缩
        compress: true,
        // 端口号
        port: 3000,
        // 自动打开浏览器
        open: true,
    }
};
