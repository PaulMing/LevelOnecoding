
var root = window.player;
var dataList;
var len;
var audio = root.audioManager;
function getData(url){
    $.ajax({
        type: 'GET',
        url: url,
        success: function(data){
            // console.log(data);
            dataList = data;
            len  = data.length;
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
        var i = root.controlIndex.prev();
        audio.getAudio(dataList[i].audio);
        root.render(dataList[i]);
        if(audio.status == 'play'){
            audio.play();
         }


    });
    $('.next').on('click',function(){
         var i = root.controlIndex.next();
         audio.getAudio(dataList[i].audio);
         root.render(dataList[i]);
         if(audio.status == 'play'){
            audio.play();
         }

    });
    $('.play').on('click',function(){
        if(audio.status == 'pause'){
            audio.play();
        }else {
            audio.pause();
        }
        $(this).toggleClass('playing');
    })
}

getData('../mock/data.json');