let fs = require('fs');
// error-first

// 异步操作1
// function readFile (path) {
//     return new Promise((res, rej) => {
//         fs.readFile(path, 'utf-8', (err, data) => {
//             if (err) {
//                 rej(err);
//             }else {
//                 res(data);
//             }
//         })
//     })
// }
// readFile('./data/number1.txt').then(() => {}, () => {})

// 异步操作2
// function writeFile (path) {
//     return new Promise((res, rej) => {
//         fs.wirteFile(path, 'utf-8', (err, data) => {
//             if (err) {
//                 rej(err);
//             }else {
//                 res(data);
//             }
//         })
//     })
// }

// 异步操作3
// function readDir (path) {
//     return new Promise((res, rej) => {
//         fs.readDir(path, 'utf-8', (err, data) => {
//             if (err) {
//                 rej(err);
//             }else {
//                 res(data);
//             }
//         })
//     })
// }


// promise化 -> 若同时有多个异步操作，往往会出现大量代码冗余，希望封装函数“更好管理”
// 封装函数
function promisify (func) {
    return function (...arg) {
        return new Promise((res, rej) => {
            func(...arg, (err, data) => {
                if (err) {
                    rej(err);
                }else {
                    res(data);
                }
            })
        });
    }
}
// promise化异步操作
let readFile = promisify(fs.readFile);
let writeFile = promisify(fs.writeFile);
let readDir = promisify(fs.readDir);

readFile('./data/number1.txt', 'utf-8').then((val) => {
    console.log(val)
});


// 封装函数
function promisifyAll (obj) {
    for (let key in obj) {
        let fn = obj[key];
        if (typeof fn === 'function') {
            obj[key + 'Async'] = promisify(fn);
        }
    }
}
promisifyAll(fs);
// fs.readFile -> readFileAsync writeFile -> writeFileAsync  readDir -> readDirAsync
fs.readFileAsync('./data/number1.txt', 'utf-8').then((val) => {
    console.log(99, val)
});



// 可引入第三方库 -> bluebird库、 P库
// let bluebird = require('bluebird');
// bluebird.promisify(fs.readFile);//库下面的方法