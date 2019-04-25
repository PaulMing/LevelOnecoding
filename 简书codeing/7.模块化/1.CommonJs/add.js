
var m1 = require('./modules/m1');//默认m1.js，所以不要写成 require('./modules/m1.js');
var m2 = require('./modules/m2');
var m3 = require('./modules/m3');

m1.foo();
m2();
m3.foo();
// m1 = {
//     msg: 'module1',
//     foo: function(){
//         console.log(this.msg);
//     }
// }

// m2 = function(){
//     console.log('m2');
// }

// m3 = {
//     foo = function(){
//         console.log("mod");
//     }
// }


