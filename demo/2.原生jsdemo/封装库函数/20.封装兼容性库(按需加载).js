
// 封装异步加载函数；[函数调用过程要注意]
/* <script type="text/javascript"> */
function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = "text/javascript";
    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState == "complate" || script.readyState == "loaded") {
                callback();
            }
        }
    } else {
        script.onload = function () {
            callback();
        }
    }
    script.src = url;
    document.head.appendChild(script);
}
// 使用兼容性函数
// loadScript('tools.js',test);//错误写法；
// loadScript('tools.js',function(){
//     test();
// })

