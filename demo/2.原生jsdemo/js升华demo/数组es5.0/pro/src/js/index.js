// 需求分析 样式布局 数据渲染+行为处理  迭代优化
// 数据太多做翻页
var personArr = [
    {name:"James Harden", src:"./src/images/1.jpg",des:"火箭队-休斯顿",posit:"后卫"},
    {name:"LeBron James", src:"./src/images/2.jpg",des:"湖人队-洛杉矶",posit:"后卫"},
    {name:"Chris Paul", src:"./src/images/3.jpg",des:"火箭队-休斯顿",posit:"控卫"},
    {name:"Stephen Curry", src:"./src/images/4.jpg",des:"勇士队-金州",posit:"控卫"},
    {name:"Russell Westbrook", src:"./src/images/5.jpg",des:"雷霆队-俄克拉荷马",posit:"控卫"}
]

// 数据渲染+行为实现
// initial variable: 初始数据
var oUl = document.getElementsByTagName("ul")[0]; 
var oinput = document.getElementsByTagName("input")[0];

// 根据数据渲染页面
function RenderPage(data){
    var htmlStr = "";
    oUl.innerHTML = "";
    data.forEach(function(ele,index,self){
        htmlStr = htmlStr + '<li><img src="'+ele.src+'"><p class="name">'+ele.name+'</p><p class="des">'+ele.des+'</p></li>'
    })
    oUl.innerHTML = htmlStr;
}
RenderPage(personArr);

// 添加行为,筛选后渲染至页面
oinput.oninput = function(){
    var filterText = this.value;
    // 根据过滤条件过滤后的数组
    // var newArray = filterArrByText(personArr,filterText);
    // RenderPage(newArray);
    RenderPage(filterArrByText(personArr,filterText));
}
oinput.onfocus = function(){

}
// 根据文本来过滤函数，纯函数(操作过程中若是引用值，使用深度克隆的值，要不过滤掉，原数组就没了) ，参数必然是数据和条件
function filterArrByText(data,text){
    if(!text){
        return data;
    }else{
        /* var newData = data.filter(function(ele,index){
        })
        return newData; */
        return data.filter(function(ele,index,self){
            // if(ele.name.indexOf(text) !=-1){
            //     return true;
            // }else{return false}
            return ele.name.indexOf(text)!= -1;
        })
    }
}


// btn style
// var oBtnArr = document.getElementsByClassName("btn");
// 获得到的是类数组，forEach();是数组的方法 进行如下操作，使用方法将其变为数组；两种方式等价；
// var oBtnArr = Array.prototype.slice.call(document.getElementsByClassName("btn"),0);
var oBtnArr = [].slice.call(document.getElementsByClassName("btn"),0);
var lastActiveBtn = oBtnArr[2];
oBtnArr.forEach(function(ele,index,self){
    ele.onclick = function(){
        changeActive(this);
        RenderPage(filterArrByPosit(personArr,this.getAttribute("posit")));
        

    }
})

function changeActive(curActiveBtn){
    curActiveBtn.className = "btn active";
    lastActiveBtn.className = "btn";
    lastActiveBtn = curActiveBtn;
}

// 根据posit来过滤
function filterArrByPosit(data,posit){
    if(posit == "All"){
        return data;
    }else{
        return data.filter(function(ele,index,self){
            return ele.posit == posit;
        })
    }
}









