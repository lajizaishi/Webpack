const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    mode: 'development'
};
