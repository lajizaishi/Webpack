const { resolve } = require('path');
const HtmlWebpackPlugin =require('html-webpack-plugin');
// 不同之处'link'标签引入不是style标签不会出现闪屏现象
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 设置nodejs环境变量
process.env.NODE_ENV = "development";

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
                    'css-loader',
                    /*
                        css兼容性处理：postcss --> postcss-loader postcss-preset-env

                        帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式

                        "browserslist": {
                            // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
                            "development": [
                              "last 1 chrome version",
                              "last 1 firefox version",
                              "last 1 safari version"
                            ],
                            // 生产环境: 默认是看生产环境
                            "production": [
                              ">0.2%",
                              "not dead",
                              "not op_mini all"
                            ]
                          }
                    */
                    // 1、使用loader的默认配置
                    // 'postcss-loader',
                    // 2、改loader的配置 加postcss.config.js 文件
                    {
                        loader: "postcss-loader",
                    }

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
            filename: 'css/built.css',
            // chunkFilename 指未被列在 entry 中，却又需要被打包出来的 chunk 文件的名称。一般来说，这个 chunk 文件指的就是要懒加载的代码。
            chunkFilename: 'css/built.css'
        })
    ],
    mode: "development"
}