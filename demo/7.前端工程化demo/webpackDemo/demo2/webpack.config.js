// JS tree shaking -> 深度
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
// 抽离css文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// CSS tree shaking 
const path = require('path');
const glob = require('glob-all');
const PurifyCSSPlugin = require('purifycss-webpack');
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    plugins: [
        // 抽离 css 
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        // css tree shaking
        new PurifyCSSPlugin({
            paths: glob.sync([
                path.join(__dirname, './*.html'),//比较 html文件中涉及的标签 -> 底层利用正则进行匹配，所以若有标签被注释掉了，其也会被匹配到，因此没用的标签要删除掉
                path.join(__dirname, './src/*.js')//比较 JS中若动态操作css样式
                ]),
        }),
        // JS 深度 tree shaking
        new WebpackDeepScopeAnalysisPlugin(),
    ],  
}