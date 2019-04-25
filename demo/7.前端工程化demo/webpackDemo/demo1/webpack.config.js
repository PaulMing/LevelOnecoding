
// var path = require('path');
// 引入插件
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    // 单入口
    // entry: './src/index.js',
    // 多入口
    entry: {
        index: './src/index.js',
        app:'./src/app.js',
    },
    // 出口
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist',//__dirname是nodejs内置，直接使用即可
        // path: path.resolve(__dirname, 'dist'),//这种写法必须引入path模块，nodejs内置模块，直接引入即可
        // path:'/dist',//直接输出路径，必须使用绝对路径
    },
    // 转换器
    module: {
        // 下载：npm install style-loader css-loader less-loader less --save-dev
        // 下载后直接使用即可，无需引入
        rules: [
            { test: /\.css$/, use: ['style-loader','css-loader','less-loader'] }
        ]
    },
    // 插件
    // 下载 -> 引入 -> 使用
    plugins:[
        new HtmlWebpackPlugin(),//单独抽离html文件
        // new HtmlWebpackPlugin({options});//后期复杂 -> 巧妙利用“配置项”解决，例如html中的<title>,<script>等
    ],


    // 模式
    mode: 'development',    
}