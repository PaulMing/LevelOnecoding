import sum from './sum';
var minus = require('./minus');
import '../src/demo.less';//直接引入less文件即可，模块化针对的是js文件，less/css并没有导出导入，less自身有导入 -> 聚焦点不同
// loader 能够 import 导入任何类型的模块（例如 .css 文件），这是 webpack 特有的功能

console.log(sum(3,4));
console.log(minus(12,10));

// var arr = [1,2,3,4,5,6];
// arr.forEach(element => {
//     console.log(element)
// }); 
