// 首个参数是其依赖的模块，多个模块可写为数组形式
// 依赖的模块作为第二个参数的形参传入到函数中
define(['demo'],function(m1){
    var msg = 'index';
    function showMsg(){
        console.log(msg,m1.getName());
    }
    // 暴露模块
    return {showMsg:showMsg}
})

