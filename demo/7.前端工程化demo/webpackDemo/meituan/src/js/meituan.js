require('../css/reset.css');
require('../plug/css/swiper.min.css');
require('../webfont/iconfont.css');
require('../css/meituanIndex.css');
var $ = require('jquery');
// var Swiper = require('swiper');
import Swiper from 'swiper';
$(function () {
    //初始化插件实例
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop: 'true',
        effect: 'cube',
        cube: {
            shadow: false,
            slideShadows: false,
        }
    });
});
function getData() {
    $.ajax({
        type: 'GET',
        url: '/api/list.json',
        success: function (res) {
            console.log(res);
            var data = res.list;
            renderDom(data);
        }
    })
}
getData();

function renderDom(list) {
    // $('.guess-foodlist > .list')
    var str = '';
    list.forEach(function(item, index) {
        str += ' <li class="foodspic">\
        <a href="meituan-detail.html?id=' + item.id +'" target="_blank" class="clearfix">\
            <img src="' + item.info.imgurl + '" alt="">\
            <dl>\
                <dt>' + item.info.name +'</dt>\
                <dd>\
                    <p class="foodtitle">' + item.info.des +'</p>\
                    <p class="price">\
                        <span><strong>' +item.info.price +'</strong><i>元</i></span>\
                        <span>'+ item.info.newUser +'</span>\
                        <span>' + item.info.sale +'</span>\
                    </p>\
                </dd>\
            </dl>\
        </a>\
    </li> '
    });
    $('.guess-foodlist > .list').html(str);
}