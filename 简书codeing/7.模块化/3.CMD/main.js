// 入口文件
// 参数只有require -> 只引入，不暴露
define(function(require){
    var m1 = require('./modules/m1');
    m1.foo();
    var m4 = require('./modules/m4');
    m4.m4();
})


