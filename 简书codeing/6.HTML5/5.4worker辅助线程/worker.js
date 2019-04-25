// 引入
importScripts('./add.js');//可引入js文件->但不要引入jQuery等类库
// 辅助线程->聚焦点：处理js ->其不属于页面，因此其没有window对象
// worker只是window的子集，只能实现部分功能，不能获取到window, document，所以这里不要引jquery zepto。可以引入一些计算类的库
console.log(document.getElementById('btn'));//报错 document is not defined

// 辅助线程
// this触发message事件接收数据
this.onmessage = function(e){
    console.log(e);
    var data = e.data;//e.data就是传过来的数据
    var sum = 0;
    for(var i=0; i<data; i++){
        sum += i;
    }
    console.log(sum);
    postMessage(sum);//发送数据
    this.close();//副线程对象this中断线程
    postMessage(1);  
}

