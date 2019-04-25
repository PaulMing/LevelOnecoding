

// 递归实现阶乘
// for循环
var n = parseInt(window.prompt('input'));
var mul = 1;
for (var i = 1; i <= n; i++) {
    mul *= i;
}
document.write(mul);
// 递归 n! = n * (n-1)!
// n==1;是出口，n==0;规定：0的阶乘是1，负数没有阶乘；
function mul(n) {
    if (n == 1 || n == 0) {
        return 1;
    }
    return n * mul(n - 1);//规律
}
mul(5);

// 递归实现斐波那契数列
// f s t
// 1 1 2 3 5 8
// for循环
var n = parseInt(window.prompt('input'));
var first = 1,
    second = 1,
    third;
if (n > 2) {
    for (var i = 0; i < n - 2; i++) {
        third = first + second;
        first = second;
        second = third;
    }
    document.write(third);
} else {
    document.write(1);
}
//递归
function fb(n) {
    // 第一位、第二位都为1，其为出口；不研究负数；
    if (n == 1 || n == 2) {
        return 1;
    }
    return fb(n - 1) + fb(n - 2);//规律
}

//计算2的n次幂，n可输入，n为自然数；
var n = parseInt(window.prompt('input'));
var mul = 2;
for (var i = 0; i < n - 1; i++) {
    mul *= 2;
}
//方法2
var mul = 1;
for (var i = 0; i < n; i++) {
    mul *= 2;
}

//打印100以内的质数， 质数也称为素数，  和合数是相反的；
// 利用count记数，若是等于2，代表只有两次是余数为0，那么质数的条件符合；
var count = 0;
for (var i = 2; i < 100; i++) {
    for (var j = 1; j <= i; j++) {
        if (i % j == 0) {
            count++;
        }
    }
    if (count == 2) {
        document.write(i + "");
    }
    count = 0;
}
// 优化版 循环圈数减少，性能提高  一个数开方后还是一样；
var count = 0;
for (var i = 2; i < 100; i++) {
    for (var j = 1; j <= Math.sqrt(i); j++) {
        if (i % j == 0) {
            count++;
        }
    }
    if (count == 1) {
        document.write(i + "");
    }
    count = 0;
}

// 定义函数实现输入数字，逆转并输出汉字形式；
function reverse() {
var num = window.prompt('input');
var str = '';
for (var i = num.length - 1; i >= 0; i--) {
    str += transfer(num[i]);;
}
console.log(str);
}
function transfer(target) {
    switch (target) {
        case "1":
            return "壹";
        case "2":
            return "贰";
        case "3":
            return "叁";
    }
}
reverse(123);

// 要求输入一串低于10位的数字，输出这串数字的中文大写；
// input： 10000    壹万；
function compnum() {
    var num = window.prompt('input');
    var str = '';
    for (var i = 0; i < num.lenght; i++) {
        str += transfer(num[i])
    }
}
function transfer(target) {
    switch (target) {
        case "1":
            return "壹";
        case "2":
            return "贰";
        case "3":
            return "叁";
    }
}

// 封装isNaN();
function isNaN(num) {
    var ret = Number(num);
    ret += "";
    if (ret == "NaN") {
        return true;
    } else {
        return false;
    }
}

// 封装圣杯模式(对象继承)
function inherit(Target, Origin) {
    function F() { };
    F.prototype = Origin.prototype;
    Target.prototype = new F();
    Target.prototype.constructor = Target;
    Target.prototype.uber = Origin.prototype;
}

// 封装深层克隆方法(引用值只考虑是数组/对象，不考虑方法)
function deepClone(origin, target) {
    var target = target || {};
    var toStr = Object.prototype.toString;
    var arrStr = '[object Array]';
    for (var prop in origin) {
        if (origin.hasOwnProperty(prop)) {
            if (origin[prop] !== null && typeof (origin[prop]) == "object") {
                // if(toStr.call(origin[prop]) == arrStr){
                //     target[prop] = [];
                // }else{
                //     target[prop] = {};
                // }
                // 使用三目运算符优化
                target[prop] = toStr.call(origin[prop]) == arrStr ? [] : {};
                deepClone(origin[prop], target[prop]);
            } else {
                target[prop] = origin[prop]
            }
        }

    }
    return target;
}

// 封装type方法：
function type(target) {
    var template = {
        "[object Array]": "array",
        "[object Object]": "object",
        "[object Number]": "number -object",
        "[object Boolean]": "boolean -object",
        "[object String]": "string -boject"
    }
    if (target == null) {
        return "null";
    }
    if (typeof (target) == "object") {
        var str = Object.prototype.toString.call(target);
        return template[str];
    } else {
        return teypeof(target);
    }
}

// 封装多物体多值链式运动框架(结合计算样式封装函数getStyle()使用)
// json:传入对象；callback:传入函数
function startMove(obj, json, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var bStop = true;
        for (var attr in json) {
            if (attr == 'opacity') {
                iCur = parseFloat(getStyle(obj, attr)) * 100;
            } else {
                iCur = parseInt(getStyle(obj, attr));
            }
            iSpeed = (json[attr] - iCur) / 7;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if (attr == 'opacity') {
                obj.style.opacity = (iCur + iSpeed) / 100;
            } else {
                obj.style[attr] = iCur + iSpeed + 'px';
            }
            if (iCur != json[attr]) {
                bStop = false;
            }
        }
        if (bStop) {
            clearInterval(obj.timer);
            // 有函数就执行，没有并执行；
            typeof callback() == 'function' ? callback() : '';
        }
    }, 30)
}  

// 封装弹性运动函数
function startMove(obj,target) {
    clearInterval(obj.timer);
    var iSpeed = 20;
    var a;
    var u = 0.8;
    obj.timer = setInterval(function () {
        a = (target- obj.offsetLeft) / 10;
        iSpeed = iSpeed + a;
        iSpeed = iSpeed * u;
        if (Math.abs(iSpeed) <= 1 && Math.abs(target - obj.offsetLeft) <= 1) {
            clearInterval(obj.timer);
            obj.style.left = target;
        } else {
            obj.style.left = obj.offsetLeft + iSpeed + 'px';
        }
    }, 30)
}

// 实现分页功能（学生管理系统），API/接口/插件
function getPages(page, totalPage) {
    var pages = [page];//[1,2,3,4,5,6,7,8,9,10]
    var left = page - 1;//0
    var right = page + 1;//11
    while (pages.length < 10 && (left >= 1 || right <= totalPage)) {
        if (left >= 1) {
            pages.unshift(left--);
        }
        if (pages.length < 10 && right <= totalPage) {
            pages.push(right++);
        }//[1,2,3,4,5,6,7,8,9,10]

    }
    return pages;//[1,2,3,4,5,6,7,8,9,10]
}
    // var maee = getPages(9,200);
    // console.log(maee);


// 封装拖拽函数
function bindEvent(ele,wrap){
var X,Y,boxT,boxL,disX,dixY;
var drag = false;
ele.onmousedown = function(e){
    drag = true;
    var event = e || window.event;
    X = event.clientX;
    Y = event.clientY;
    boxL = ele.offsetLeft;
    boxT = ele.offsetTop;
    disX = X - boxL;
    disY = Y - boxT;
};
wrap.onmousemove = function(e){
    var event = e || window.event;
    if(drag){
        ele.style.left = event.clientX - disX + 'px';
        ele.style.top = event.clientY - disY + 'px'; 
    }
};
ele.onmouseup = function(e){
    drag = false;
}
}







// 封装数组去重：
// 两层for循环
Array.prototype.unique = function () {
    var count = 0;
    var arr = [];
    console.log(count);
    for (var i = 0; i < this.length; i++) {
        for (var j = i + 1; j < this.length; j++) {
            count++;//可计数     
            if (this[i] == this[j]) {
                arr.push(this[i]);
            }
        }
    }
    return arr;
}
// 利用对象属性
Array.prototype.unique = function () {
    var temp = {},
        arr = [],
        len = this.length;
    for (var i = 0; i < len; i++) {
        if (!temp[this[i]]) {
            temp[this[i]] = 'abc';//此处的属性值可为其他，但不要写this[i],有bug;
            arr.push(this[i]);
        }
    }
    return arr;
}