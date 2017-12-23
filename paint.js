var container = $(".container");
//canvas区
var canvas = document.querySelector("canvas");
var screenWidth = document.documentElement.clientWidth;
var screenHeight = document.documentElement.clientHeight;
var width = screenWidth - 295;
var height = screenHeight - 15;
canvas.width = width;
canvas.height = height;

//先建的canvas区域
var canvasWidth = document.querySelector("create_width input[type = number]");
var canvasHeight = document.querySelector("create_height input[type = number]");
canvasWidth.value = width;
canvasHeight.value = height;
//用屏幕尺寸表示，避免因width，height的改变而改变
canvasWidth.max = screenWidth - 295;
canvasHeight.max = screenHeight - 15;

var obj = canvas.getContext("2d");

//画笔选择区
var typeChoose = $(".type li");
//多边形
var poly = $(".poly");
var trim = $(".trim");
var polyChoose = $(".trim input");

//填充、线区
var styleChoose = $(".style li");

//颜色选择区
//获取文档中有 "type=color" 属性的第一个 <input> 元素
var colorChoose = document.querySelector("input[type = color]");
//宽度选择区
var widthChoose = document.querySelector(".linewidth input[type = number]");

//文本选项区
var setting = $(".setting");
var createBt = $(".createBt");
var create = $(".create");
var create_close = $(".create_before");
var clear = $(".clear");
var back = $(".back");
var save = $(".save");
var cut = $(".cut");
var copy = $("copy");
var sure = document.querySelector("#sure");

//初始设置
var cutFlag = false;
var isCut = true;
var color = "#000";
var type = "line";
//三角形
var n = 3;
var lineWidth = "1";
var style = "stroke";
var arr = [];
$(".fill").css({display:"none"});


//多边形
poly.hover(function(){
    trim.fadeIn();
},function(){
    trim.fadeOut();
})

//绘制形状
typeChoose.each(function(index,ele){
    $(ele).click(function(){
        typeChoose.removeClass("typeActive");
        //实现画笔选择之间的切换
        //该方法检查每个元素中指定的类。如果不存在则添加类，如果已设置则删除之。这就是所谓的切换效果。
        $(this).toggleClass("typeActive");
        cut.css({color:"#fff",backgroundColor:"#5bd219",opacity:1});
        copy.css({color:"#fff",backgroundColor:"#5bd219",opacity:1});
        //attr返回被选元素的属性值
        type = $(this).attr("data");
        //判断画笔
        if($(this).is(".line")||$(this).is(".pen")){
            style = "stroke";
            $(".stroke").addClass("styleActive");
            $(".fill").css({display:"none"}).removeClass("styleActive");
        } else {
            $(".fill").css({display:"block"});
        }
    })
})

//描边、填充
styleChoose.each(function(index,ele){
    $(ele).click(function(){
        style = $(this).attr("class");
        styleChoose.removeClass("styleActive");
        $(this).toggleClass("styleActive");
    })
})


//设置
setting.each(function(index,ele){
    if($(ele).is(".cut")||$(ele).is(".copy")){
        return ;
    } else {
        $(ele).click(function(){
            $(this).css({color:"#5bd219",backgroundColor:"#fff"}).animate({opacity:0.99},200,function(){
                $(this).css({color:"#fff",backgroundColor:"#5bd219",opacity:1});
            });
        })
    }
})

//剪切
cut.click(function(){
    type = $(this).attr("data");
    typeChoose.removeClass("typeActive");
    $(this).css({color:"#5bd219",backgroundColor:"#fff"}).toggleClass("settingStyle");
    isCut = true;
})
copy.click(function(){
    type = "cut";
    typeChoose.removeClass("typeActive");
    $(this).css({color:"#5bd219",backgroundColor:"#fff"}).toggleClass("settingStyle");
    isCut = false;
})
