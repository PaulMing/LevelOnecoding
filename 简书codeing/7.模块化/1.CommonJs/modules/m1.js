
// 暴露接口的三种方式
// 方式一：module.exports={};
module.exports={
    msg: 'module1',
    foo: function(){
        console.log(this.msg);
    }
}
// 方式二：
// module.exports = function(){
//     console.log('m2');
// }

// 方式三：
// exports.foo = function(){
//     console.log("mod");
// }

