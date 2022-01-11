const { resolve } = require('path');
const HtmlWebpackPlugin =require('html-webpack-plugin');
// 不同之处'link'标签引入不是style标签不会出现闪屏现象
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: "js/built.js",
        path: resolve(__dirname,"build")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 创建style标签，将js中的css样式整合放入html
                    // 'style-loader',
                    // 这个loader取代style-loader。作用：提取js中的css成单独文件
                    MiniCssExtractPlugin.loader,
                    // 将css文件整合到js文件中
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            // 对输出文件进行重命名
            filename: 'css/built.css'
        })
    ],
    mode: "development"
}