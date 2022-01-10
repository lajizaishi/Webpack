const { resolve } = require('path');
const HtmlWebpackPlugin =require('html-webpack-plugin');
module.exports = {
    entry: './stc/js/index.js',
    output: {
        filename: "js/built.js",
        path: resolve(__dirname,"build")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: "development"
}