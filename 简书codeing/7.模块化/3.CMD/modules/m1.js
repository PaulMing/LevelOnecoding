// 定义模块
// 首个参数require引入，若无引入，可省略
// 第二个参数exports导出
define(function(require,exports,module){
    var msg = 'm1';
    function foo(){
        console.log(msg);
    }
    module.exports = {
        foo: foo
    }
})