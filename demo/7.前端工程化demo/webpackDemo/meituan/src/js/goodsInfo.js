require('../css/reset.css');
require('../webfont/iconfont.css');
require('../css/meituanDetail.css');
var $ = require('jquery');
function getData() {
    $.ajax({
        type: 'GET',
        url: '/api/list.json',
        success: function (res) {
            var data = res.list;
            getDetail(data)
        }
    });
}
function getDetail(list) {
    var query = location.search.replace('?', '');
    var queryList = query.split('&');
    var queryObj = {};
    var detail = null;
    queryList.forEach(function (item, index) {
        prop = item.split('=')[0];
        value = item.split('=')[1];
        queryObj[prop] = value;
    });
    
    list.forEach(function (item, index) {
        if (item.id == queryObj.id) {
            detail = item;
        }
    });
    renderDom(detail);
}

function renderDom(detail) {
    $('.bigimg > img').attr('src', detail.info.imgurl);
    $('.linnebg .name').text(detail.info.name);
    $('.linnebg .des').text(detail.info.des);
    $('.price_strong').text(detail.info.price);
    $('.seller .address > h4').text(detail.info.receive);
    $('.seller .address > p').text(detail.info.adderess);
    var str = "";
    detail.info.comment.forEach(function (item, index) {
        str += ' <li class="item-evaluate">\
        <div class="foot-user clearfix">\
            <img src="' + item.pic +'" alt="">\
            <div class="user-strart">\
                <h5>' + item.user +'</h5>\
            </div>\
            <p class="evaluate-date">' + item.date +'</p>\
        </div>\
        <div class="evaluate-content">\
            <p>' + item.content+'</p>\
            <p>\
                <span><img src="' + item.img +'" alt=""></span>\
            </p>\
        </div>\
        <div class="locale">\
            <a href="###">' + detail.info.receive +'</a>\
        </div>\
    </li>'
    });
    $('.food-evaluate > ul').html(str);
}
getData()