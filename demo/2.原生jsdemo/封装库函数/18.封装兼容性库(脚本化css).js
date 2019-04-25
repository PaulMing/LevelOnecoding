

// 封装封装计算样式的函数：prop传入字符串形式,获取到的也是字符串形式
function getStyle(obj, prop, fake) {
    var fake = fake || null;
    if (obj.currentStyle) {
        return obj.currentStyle[prop];
    } else {
        return window.getComputedStyle(obj, fake)[prop];
    }
}
