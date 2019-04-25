

// 封装兼容性的绑定函数方法：给一个dom对象添加该事件类型的处理函数；解决兼容以及this指向问题
function addEvent(elem, type, handle) {
    if (elem.addEventListener) {
        elem.addEventListener(type, handle, false);
    } else if (elem.attachEvent) {
        elem.attachEvent('on' + type, function () {
            handle.call(elem);
        })
    } else {
        elem['on' + type] = handle;
    }
}

// 封装事件解除函数：
function removeEvent(elem,type,func){
    if(ele.removeEventListener){
        elem.removeEventListener(type,func,false);
    }else if(elem.datachEvent){
        elem.detachEvent("on"+type,func);
    }else{
        elem["on"+type] = null;
    }
}

// 封装兼容性取消冒泡函数
function stopBubble(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}

// 封装阻止默认事件的函数：
function cancelHandler(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}

// 封装查看事件源对象的函数
div.onclick = function (e) {
    var event = e || window.event;
    var target = event.target || event.srcElement;
    console.log(target);
}

// 封装拖拽事件函数 [结合了绑定事件处理函数和解除事件绑定函数]
function drag(elem) {
    var disX,
        disY;
    addEvent(elem, 'mousedown', function (e) {
        var event = e || window.event;
        disX = event.clientX - parseInt(getStyle(elem, "left"));
        disY = event.clientY - parseInt(getStyle(elem, "top"));
        addEvent(document, "mousemove", mouseMove);
        addEvent(document, "mouseup", mouseUp);
        stopBubble(event);
        cancelHandler(event);
    });
    function mouseMove(e) {
        var event = e || window.event;
        elem.style.left = event.clientX - disX + "px";
        elem.style.top = event.clientY - disY + "px";
    }
    function mouseUp(e) {
        var event = e || window.event;
        removeEvent(document, 'mousemove', mouseMove);
        removeEvent(document, "mouseup", mouseUp);
    }
}