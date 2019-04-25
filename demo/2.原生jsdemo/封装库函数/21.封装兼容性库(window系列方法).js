

// 封装滚动条滚动距离
function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset,
        }
    } else {
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop,
        }
    }
}

// 封装获取可视区窗口宽高：getViewportOffset();
function getViewportOffset() {
    if (window.innerWidth) {
        return {
            w: window.innerWidth,
            h: window.innerHeight
        }
    } else {
        if (document.compatMode === 'BackCompat') {
            return {
                w: document.body.clientWidth,
                h: document.body.clientHeight
            }
        } else {
            return {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight
            }
        }
    }
}

// 封装获取元素相对于文档的坐标；
Element.prototype.getPosition = function () {
    if (!this.offsetParent) {
        return {
            w: this.offsetLeft,
            h: this.offsetTop
        }
    }
    var width = this.offsetLeft,
        height = this.offsetTop,
        ele = this.offsetParent;
    while (ele.offsetParent) {
        width += this.offsetParent.offsetLeft;
        height += this.offsetParent.offsetTop;
        ele = ele.offsetParent;
    }
    return {
        w: width,
        h: height
    }
}