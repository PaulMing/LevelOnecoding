// 主入口文件
(function(){
    // 引入模块的配置文件
    require.config({
        paths:{
            index: '../module/index',//省略index.js中的后缀
            demo: '../module/demo',
            // jquery: '../module/jquery',
        }
    })
    // 加载模块
    // 依赖index模块，并且该模块作为形参传入到第二个参数中
    require(['index'],function(index){
        index.showMsg();
    })
    // 可引入jquery模块，实际jQuery源码是支持AMD规范的
    // require(['index','jquery'],function(index,$){
    //     index.showMsg();
    //     $('body').css('backgroundColor','red');
    // })
})()


