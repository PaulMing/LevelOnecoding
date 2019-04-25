

// 遍历元素节点数：
Element.prototype.elementNum = function () {
    var child = this.children;
    var len = child.length;
    for (var i = 0; i < len; i++) {
        console.log(child[i]);
    }
}

// 封装函数，返回元素e的第n层祖先元素节点
function retParent(elem, n) {
    while (elem && n) {
        elem = elem.parentElement;
        n--;
    }
    return elem;
}

// 封装函数实现myChildren();功能,解决部分浏览器不兼容问题；
Element.prototype.myChildren = function () {
    var child = this.childNodes;
    var len = child.length;
    // var arr = [];//也OK;原功能返回类数组，类数组最佳；
    var temp = {
        length: 0,
        push: Array.prototype.push,
        splice: Array.prototype.splice
    }
    for (var i = 0; i < len; i++) {
        if (child[i].nodeType == 1) {
            temp.push(child[i]);
        }
    }
    return temp;
}

//  封装函数hasChildren();不可使用children属性；
Element.prototype.hasChildren = function () {
    var child = this.childNodes;
    var len = child.length;
    for (var i = 0; i < len; i++) {
        if (child[i].nodeType == 1) {
            return true;
        }
    }
    // 遍历完所有节点后都没有元素节点return false;
    return false;
}

// 封装函数，返回元素e的第n个兄弟元素节点，n为正，返回后面的兄弟元素节点，n为负，返回前面的，n为0，返回自身；
function retSibling(e, n) {
    while (e && n) {
        if (n > 0) {
            // ie9以下对nextElementSibling不兼容，测试可以采取下列方式，程序会直接执行else部分；
            // if(0 && e.nextElementSibling){}
            if (e.nextElementSibling) {
                e = e.nextElementSibling;
            } else {
                for (e = e.nextSibling; e && e.nodeType != 1; e = e.nextSibling);

            }
            n--;
        } else {
            if (e.previousElementSibling) {
                e = e.previousElementSibling;
            } else {
                for (e = e.previousSibling; e && e.nodeType != 1; e = e.previousSibling);
            }
            n++;
        }
    }
    return e;
}


// 封装函数实现逆序；
Element.prototype.reverseNode = function () {

}

// 封装函数insertAfter(); 功能类似insertBefore();
// insertAfter() 与 insertBefore(); 相互转化
Element.prototype.insertAfter = function (targetNode, afterNode) {
    var beforeNode = afterNode.nextElementSibling;
    if (beforeNode == null) {
        this.appendChild(targetNode);
    }
    this.insertBefore(targetNode, beforeNode);
}

// 封装document.getElementsByClassName();  Element  document;
Element.prototype.getElementsByClassName = Document.prototype.getElementsByclassName = document.getElementsByClassName || function(_className){
    var allDomArray = document.getElementsByTagName("*");
    var lastDomArray = [];
    function trimSpace(strClass){
        var reg = /\s+/g;
        var newStrClass = strClass.replace(reg,"");
        return newStrClass;
    }
    for(var i=0;i<allDomArray.length;i++){
        var lastStrClass = trimSpace(allDomArray[i].className).trim();
        var classArray = lastStrClass.split("");
        for(var j=0; j<classArray.length; j++){
            if(classArray[j] == _className){
                lastDomArray.push(allDomArray[i]);
                break;
            }
        }
    }
    return lastDomArray;
}  
