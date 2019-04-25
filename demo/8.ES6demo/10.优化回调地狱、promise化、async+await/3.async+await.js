


// async+await解决回调地狱
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



// async+await解决try{}catch(){} -> 捕获异步代码的错误
async function read (url) {
    try{
        let val1 = await readFile(url);
        let val2 = await readFile(val1);
        let val3 = await readFile(val2);
        return val3;
    }catch(err){
        console.log(err);
    }
};
// 故意写错测试
read('./data/number2.txt').then((val) => {
    console.log(val);
});




// async+await解决同步并发的异步结果 -> 有些牵强
// 需求：Promise.all()内若有promise对象触发了失败的回调函数，使用try..catch(){}捕获，从而让其只能执行成功的回调

Promise.all([readFile('./data/number1.txt'), readFile('./data/number.txt'), readFile('./data/number2.txt')]).then((val) => {
    console.log(val);
}, (reason) => {
    console.log(reason);
});

async function read1 () {
    let val1 = null;
    try {
        val1 = await readFile('./data/number1.txt');
        console.log(val1);
    }catch(e) {
        console.log(e)
    }
};
async function read2 () {
    let val2 = null;
    try {
        val2 = await readFile('./data/number.txt');
        console.log(val2);
    }catch(e) {
        console.log(e, 2)
    }
};
async function read3 () {
    let val3 = null;
    try {
        val3 = await readFile('./data/number1.txt');
        console.log(val3);
    }catch(e) {
        console.log(e)
    }
};
function readAll(...args) {
    args.forEach((ele) => {
        ele();
    });
}

readAll(read1, read2, read3);