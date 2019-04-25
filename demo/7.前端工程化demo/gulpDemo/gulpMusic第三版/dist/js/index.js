
var root = window.player;
var dataList;
var len;
var audio = root.audioManager;
var control;
var timer = null;
var duration = 0;
function getData(url){
    $.ajax({
        type: 'GET',
        url: url,
        success: function(data){
            // console.log(data);
            dataList = data;
            len  = data.length;
            control = new root.controlIndex(len);
            root.render(data[0]);
            audio.getAudio(data[0].audio);
            root.pro.renderAllTime(data[0].duration);
            duration = data[0].duration;
            bindEvent();
            bindTouchEvent();
        },
        error: function(){
            void 0;
        }
    })
}

// 按钮点击事件
function bindEvent(){
    // 自定义事件
    $('body').on('play:change',function(e,index){
        audio.getAudio(dataList[index].audio);
        root.render(dataList[index]);
        root.pro.renderAllTime(dataList[index].duration);
        duration = dataList[index].duration;
        if(audio.status == 'play'){
            audio.play();
            root.pro.start(0);
            root.pro.stop();
            rotated(0);
        }else{
            root.pro.update(0);
        }
        // 音乐转盘重置样式
        $('.img-box').attr('data-deg',0);
        $('.img-box').css({    
            'transform': 'rotateZ(0)',
            'transition': 'none'
        })
    })
    $('.prev').on('click',function(){
        var i = control.prev();
        $('body').trigger('play:change',i);
    });
    $('.next').on('click',function(){
         var i = control.next();
         $('body').trigger('play:change',i);    
    });
    // 播放/暂停
    $('.play').on('click',function(){
        if(audio.status == 'pause'){
            audio.play();
            root.pro.start();
            var deg = $('.img-box').attr('data-deg');
            rotated(deg);
        }else {
            audio.pause();
            root.pro.stop();
            clearInterval(timer);
        }
        $(this).toggleClass('playing');
    })
}
// 音乐转盘
function rotated(deg){
    clearInterval(timer);
    // var deg = 0;
    deg = +deg;//隐式类型转换为数字
    timer = setInterval(function(){
        deg += 2;
        $('.img-box').attr('data-deg',deg);
        $('.img-box').css({    
            'transform': 'rotateZ('+ deg +'deg)',
            'transition': 'all 1s ease-out'
        })
    },300)
}



// 拖拽事件
function bindTouchEvent() {
    var left =  $('.pro-bottom').offset().left;
    var width = $('.pro-bottom').offset().width;
    $('.spot').on('touchstart', function (e) {
        root.pro.stop();//开始拖动 -> 进度条停止运动
    }).on('touchmove', function (e) {
        // clientX相对于视口,left为相对于父元素的距离 -> 作差即可得到走过的距离
        var x = e.changedTouches[0].clientX - left;
        var per = x / width;
        // 设定范围
        if (per >= 0 && per < 1) {
            root.pro.update(per);
        }
    }).on('touchend', function (e) {
        var x = e.changedTouches[0].clientX - left;
        var per = x / width;
        var curTime = per * duration;
        if (per >= 0 && per < 1) {
            audio.playTo(curTime);
            audio.play();
            root.pro.start(per);
            $('.play').addClass('playing');
       } 
    })
}
// 单曲播放结束自动触发下一首 audio.onended事件
$(audio.audio).on('ended', function () {
    $('.next').trigger('click');
})


getData('../mock/data.json');