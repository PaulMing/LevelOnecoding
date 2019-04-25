var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');//插件
var Uglify = require('uglifyjs-webpack-plugin');//插件
var Minify = require('mini-css-extract-plugin');//插件
module.exports={
    // 入口文件三种格式： 字符串/数组/对象
    entry:'./src/main.js',
    // 多入口文件的输入输出，输入以对象的形式，输出[name] name表示的便是main或logi,其是一种简写形式
    // entry:{
    //     main: './src/main.js',
    //     logi: './src/logi.js',
    // }
    // output:{
    //     filename:'[name].js'
    // }

    // 出口
    output:{
        // 打包的文件名
        filename: 'bundle.js',
        // 打包文件的路径 -> __dirname:根目录(两个下划线)
        path:path.resolve(__dirname,'dist')
    },

    // 设置环境变量
    // mode: 'production',//生产者环境 -> 代码压缩
    mode: 'development',//开发者环境 

    // 配置服务器
    devServer:{
        // 基础路径 -> 开启服务器后localhost:8080,其直接执行dist文件夹下的html页面，若不设置，URL输入localhost:8080,其会打开整个大文件webact的目录，需要逐层打开
        contentBase: 'dist',
        port: 9999,//修改端口号，默认是8080 -> 避免端口占用
        // 配置好服务器后 -> localhost:9999 -> 之后页面内容有所修改，不需要刷新，页面数据自动更新
    },



    // 应用loader
    // webpack4使用的是module:{rules:[]}, webpack4之前使用的是loader:{rules:[]}
    // rules:[]//数组形式，表示其中可以写很多解析器
    module:{
        rules:[
            // css loader -> 处理css文件
            {
                test:/\.css$/,//正则匹配css文件
                // 解析过程都是从后向前解析 -> 先解析css-loader,然后解析style-loader
                // style-loader->解析成行内样式，但不会生成css文件，元素行内也不显示样式，但样式已经作用到了元素上,实际默认是转换到了bundle.js中了
                // use:['style-loader','css-loader']
                use:[Minify.loader,'css-loader'],//使用插件，单独抽离css
            },
            // html loader -> 处理html文件
            {
                test:/\.html$/,//正则匹配html文件
                use:[
                    // 单独抽离的html文件进行配置
                    {
                        loader: 'file-loader',
                        // 配置
                        options:{
                            name: 'index.html'
                        }
                    },
                    // 单独抽离html -> 否则webpack将其直接打包在了bundle.js中
                    {
                        loader: 'extract-loader'
                    },
                    //  解析html文件
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            // js loader ->主要是转换es6
            // {
            //     test: /\.js/,//正则匹配js文件
            //     use:['babel-loader']
            // },
            // img loader
            {
                test:/\.(png|jpg)$/,
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,//限制字节，防止图片太大
                            name: 'img/[name].[hash:8].[ext]'//name和ext后缀，hash表示图片的唯一标识，其可以为contenthash,其表示根据文件内容生成的hash值，css、html才用contenthash,img直接使用hash即可
                        }
                    }
                ]
            }
        ]
    },
    // 应用插件
    plugins:[
        // new HtmlWebpackPlugin();//其直接就把src/index.html文件直接放到了dist/index.html下了，括号内可写配置项
        new HtmlWebpackPlugin({
            title: 'title',//html文件中<title></title>标签中的内容
            template: './src/index.html',//模板
            // 压缩空白 -> 去掉代码之间的空格
            minify:{
                conservativeCollapse: true
            }
        }),
        // 
        new Uglify({}),
        new Minify({
            filename: '[name]_[contenthash:8].css'
        })
    ]
}





