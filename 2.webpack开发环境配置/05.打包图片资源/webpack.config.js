
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports={
    entry: './src/index.js',
    output: {
        filename: "built.js",
        path: resolve(__dirname,'build')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                // 要使用多个loader处理用use
                use: ['style-loader','css-loader','less-loader']
            },
            {
                //处理图片资源
                test: /\.(jpg|png|jif)$/,
                // 使用一个loader
                // 下载 url-loader file-loader
                loader: "url-loader",
                options: {
                    // 图片大小大于8kb，就会被base64处理
                    // 优点：减少请求数量（减轻服务器压力）
                    // 缺点：图片体积会更大（文件请求速度更慢）
                    limit: 8 * 1024,
                    esModule: false,
                }
            }
        ]
    },
    plugins: [
        // plugins的配置
        // html-webpack-plugin
        // 功能：默认创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
        // 需求：需要有结构的HTML文件
        new HtmlWebpackPlugin({
            // 复制一个./src/index.html文件，并自动引入打包输出的所有资源（JS/CSS)
            template: "./src/index.html"
        })
    ],
    mode: 'development'
}