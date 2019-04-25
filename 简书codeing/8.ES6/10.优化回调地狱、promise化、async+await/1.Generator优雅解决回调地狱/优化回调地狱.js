// node环境

// 方案1：promise对象解决回调地狱
let fs = require('fs');
function readFile (path) {
    return new Promise((res, rej) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (data) {
                res(data);
            }else {
                rej(err);
            }
        })
    });
};
readFile('./data/number.txt').then((val) => {
    return readFile(val);
}).then((val) => {
    return readFile(val);
}).then((val) => {
    console.log(val);
});


// 方案2：Generator生成器+promise对象解决回调地狱
let fs = require('fs');
function readFile (path) {
    return new Promise((res, rej) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (data) {
                res(data);
            }else {
                rej(err);
            }
        })
    });
};
function * read (url) {
    let val1 = yield readFile(url);
    let val2 = yield readFile(val1);
    let val3 = yield readFile(val2);
    return val3;
};
let oG = read('./data/number.txt');
let {value, done} = oG.next();
value.then((val) => {
    let {value, done} = oG.next(val);
    value.then((val) => {
        let {value, done} = oG.next(val);
        value.then((val) => {
            console.log(val);
        });//可进行递归优化
    });
});


// 方案3递归优化：Generator生成器+promise对象+co库 解决回调地狱
// co库是递归库: npm install co, 引入使用即可 ->co库很强大，是TJ写的，express koa也出自他手
let fs = require('fs');
function readFile (path) {
    return new Promise((res, rej) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (data) {
                res(data);
            }else {
                rej(err);
            }
        })
    });
};
function * read (url) {
    let val1 = yield readFile(url);
    let val2 = yield readFile(val1);
    let val3 = yield readFile(val2);
    return val3;
};

let co = require('co');
co( read('./data/number.txt') ).then((val) => {
    console.log(val);
});

// 手动封装co库
// function Co (oIt) {
//    return new Promise((res, rej) => {
//         let next = (data) => {
//             let {value, done} = oIt.next(data);
//             if (done) {
//                 res(value);
//             }else {
//                 value.then((val) => {
//                     next(val);
//                 }, rej);
//             }
//         }
//         next();
//    });
// }




// 方案4：async+await解决回调地狱
let fs = require('fs');
function readFile (path) {
    return new Promise((res, rej) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (data) {
                res(data);
            }else {
                rej(err);
            }
        })
    });
};
// async异步函数 -> 返回值为promise对象 
// await:等待 -> readFile(url)执行结束后才进行赋值操作
async function read (url) {
    let val1 = await readFile(url);
    let val2 = await readFile(val1);
    let val3 = await readFile(val2);
    return val3;
};
read('./data/number.txt').then((val) => {
    console.log(val);
});
