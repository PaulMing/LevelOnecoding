define(function(require,exports,module){
    var msg = 'm4';
    // 同步引入m2 ->引入m2模块后，才执行后续代码
    var m2 = require('./m2');
    m2();
    // 异步引入m3
    // 首个参数模块作为第二个参数的形参传入
    require.async('./m3',function(m3){
        m3.tle.tle();
    });
    function fun2(){
        console.log(msg);
    }
    exports.m4 = fun2;   
})


