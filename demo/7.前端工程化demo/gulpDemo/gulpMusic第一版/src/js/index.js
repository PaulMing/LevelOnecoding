
var root = window.player;
var nowIndex = 0;
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
        if(nowIndex == 0){
           nowIndex = len -1;
        }else{
            nowIndex--;
        }     
        root.render(dataList[nowIndex]);
        audio.getAudio(dataList[nowIndex].audio);
        if(audio.status == 'play'){
            audio.play();
        }
    });
    $('.next').on('click',function(){
        if(nowIndex == len-1){
            nowIndex = 0
         }else{
             nowIndex++;
         }
         root.render(dataList[nowIndex]);
         audio.getAudio(dataList[nowIndex].audio);
         if(audio.status == 'play'){
            audio.play();
        }
         

    });
    $('.play').on('click',function(){
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
