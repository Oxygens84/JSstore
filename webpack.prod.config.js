const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: {
        // Проблема оказалась действительно в самом файле @babel/polyfill (вышла новая версия) - в сборке все было верно
        // В новой версии polyfill действительно на 6-й строке использует const
        // Для плагина uglifyjs синтаксис es6 непонятен, поэтому выбрасывалась ошибка
        // Принято решение отказаться от uglifyjs в пользу terser (поддерживает es6)
        //main: ["@babel/polyfill","whatwg-fetch", "./src/public/index.js"],
        main: ["whatwg-fetch", "./src/public/index.js"],
    },
    output: {
        path: path.join(__dirname, 'dist/prod/'),
        publicPath: "/",
        filename: "js/[name].js"
    },
    target: 'web',
    devtool: "#source-map",
    optimization: {
        minimizer: [
            new TerserWebpackPlugin({
                cache: true,
                parallel: 4,
                sourceMap: true
            }),
            new OptimizeCssAssetsPlugin({})
        ]
    },
    module: {
        rules: [
            {
                // компиляция из es6+ в es5
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['url-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/public/index.html',
            filename: 'index.html',
            excludeChunks: ['server']
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: "[id].css"
        })
    ]
};