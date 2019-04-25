
var path = require('path');//nodejs中的一个path模块
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        'main': './src/js/meituan.js',
        'goodsInfo': './src/js/goodsInfo.js'
    },
    output: {
        filename: '[name].js',
        // path: __dirname + '/dist',//此种方式必须写具体的文件名称
        path: path.resolve(__dirname,'dist')
    },
    mode: 'development',
    // 依赖的模块
    module:{
        rules: [
            {
                test: /\.css$/,//确定文件
                use: ['style-loader','css-loader'],//使用的依赖包(解释器)
            },
            {
                test: /\.(png|jpg|gif|woff|tff|eot|svg)$/,//图片以及文字
                // 图片使用url-loader解析
                // 第一种写法 
                // use: ['url-loader?limit=1000&name=./[name].[ext]']
                // 第二种写法
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1000,
                        name: './[name].[ext]',
                    }
                }]
            }
        ]
    },
    plugins: [


    ]

}