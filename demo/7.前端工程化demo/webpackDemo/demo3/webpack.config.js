var path = require("path");
// 单独抽离css
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var Webpack = require("webpack");
// 单独抽离html
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 清除上一次的打包文件
var CleanWebpack = require('clean-webpack-plugin');
module.exports = {
    entry: {
        index: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name]-[hash:5].bundle.js",
        chunkFilename: "[name][hash:5].js"//提取公共js代码
    },
    // 提取公共js代码的配置
    optimization:{
        splitChunks:{
            cacheGroups:{
                common:{
                    name:'common',
                    chunks: 'all',
                    minSize: 1,
                    minChunks: 2,
                    priority: 1
                },
                vendor: {
                    name: 'vender',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'all'
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {loader:'style-loader'},
                    // { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader'},
                    {
                        loader: 'postcss-loader',//postcss首先会将css转换为可操作的js,即AST(抽象语法树)，然后AST结合不同的插件使用具备不同的功能，css-next;//预处理器;  autoprefixer;//添加前缀; cssnano;//压缩css; css-next插件的功能包含了autoprefixer功能，两者一起使用会包警告 -> postcss一般不单独使用，大多结合构建工具使用(小型项目没必要使用预处理器、后处理器、压缩等)
                        options: {
                            ident: 'postcss',
                            plugins: [
                                // require('autoprefixer')(),
                                require('postcss-cssnext')(),
                                require('cssnano')({
                                    preset: 'default'
                                }), 
                            ]
                        }
                    },
                    { loader: 'less-loader' }
                ],
            },
            {
                test:/\.(png|jpg|jpeg|gif)$/,
                use:[
                    {
                        loader:'url-loader',//base64编码转换
                        options:{
                            name:'[name].min.[ext]',
                            // limit:100000,//单位:b -> 限制图片大小(若下于100kb,则进行base64编码)
                            limit:1,
                            outputPath:'img',//打包后的路径
                        }
                    },
                    {
                        loader:'img-loader',//单独抽离图片
                        options:{
                            plugins:[
                                require('imagemin-pngquant')({
                                    quality:[0.3,0.6]
                                  }),
                            ]
                        }
                    }
                ]
            },
            {
                test:/\.html$/,
                use:[
                    {
                        // 处理html中引入的图片
                        loader:'html-loader',
                        options:{
                            attrs:['img:src']
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name]-[hash:5].css",
        }),
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./index.html',//设置模版的好处：其会将新打包后的css, js文件自动引入进去，若不设置，其始终与index.html一模一样，新打包后的需手动操作
            minify:{      
                // collapseWhitespace:true,//去掉空格   
                removeComments:true,//清理注释
            }
        }),
        // new CleanWebpack(),//每次清除上一次的打包文件
        
        new Webpack.HotModuleReplacementPlugin(),//模块热更新
    ], 
    devServer:{   
        contentBase:'dist',//默认打开的路径; // webpack-dev-server --open; webpack-dev-server --color;  
        port:'9090',// 修改端口号,默认8080    
        hot:true, // 开启热更新此时会刷新浏览器
    }
}     