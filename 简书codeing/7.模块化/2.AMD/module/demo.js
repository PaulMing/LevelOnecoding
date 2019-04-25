// define定义模块
define(function(){
    var name = "demo";
    function getName(){
        return name;
    }
    // 暴露接口 return {getName:getName};
    return {getName};//简写形式 ->属性名：属性值(函数名)
})

