
var root = window.player;
var dataList;
var len;
var audio = root.audioManager;
var control;
function getData(url){
    $.ajax({
        type: 'GET',
        url: url,
        success: function(data){
            console.log(data);
            dataList = data;
            len  = data.length;
            control = new root.controlIndex(len);
            root.render(data[0]);
            audio.getAudio(data[0].audio);
            bindEvent();
        },
        error: function(){
            console.log('error');
        }
    })
}


function bindEvent(){
    $('.prev').on('click',function(){
        var i = control.prev();
        audio.getAudio(dataList[i].audio);
        root.render(dataList[i]);
        if(audio.status == 'play'){
            audio.play();
         }


    });
    $('.next').on('click',function(){
         var i = control.next();
         audio.getAudio(dataList[i].audio);
         root.render(dataList[i]);
         if(audio.status == 'play'){
            audio.play();
         }

    });
    $('.play').on('click',function(){
        // audio.getAudio(dataList[0].audio);
        // console.log(audio);
        if(audio.status == 'pause'){
            audio.play();
        }else {
            audio.pause();
        }
        $(this).toggleClass('playing');
    })
}

getData('../mock/data.json');