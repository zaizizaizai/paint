var container = $(".container");
//canvas区
var canvas = document.querySelector("canvas");
var screenWidth = document.documentElement.clientWidth;
var screenHeight = document.documentElement.clientHeight;
var width = screenWidth - 295;
var height = screenHeight - 15;
canvas.width = width;
canvas.height = height;

var obj = canvas.getContext("2d");

//先建的canvas区域
var canvasWidth = document.querySelector(".create_width input[type = number]");
var canvasHeight = document.querySelector(".create_height input[type = number]");
canvasWidth.value = width;
canvasHeight.value = height;
//用屏幕尺寸表示，避免因width，height的改变而改变
canvasWidth.max = screenWidth - 295;
canvasHeight.max = screenHeight - 15;


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
var widthChoose = document.querySelector(".lineWidth input[type = number]");

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
//用来放画线的数组
var arr = [];
$(".fill").css({display:"none"});


//多边形
poly.hover(function(){
    //淡入效果显示隐藏元素
    trim.fadeIn();
},function(){
    //淡出效果隐藏元素
    trim.fadeOut();
})
//多边形边数
polyChoose.change(function(){
    lineWidth = this.value;
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

//颜色选择
colorChoose.onchange = function(){
    color = this.value;
}

//粗细改变
widthChoose.onchange = function(){
    lineWidth = this.value;
}

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

//新建画布
createBt.click(function(){
    create.fadeIn();
})
create_close.click(function(e){
    //阻止事件的传播
    e.stopPropagation();
    create.fadeOut();
})
//onblur在对象失去焦点时发生
canvasWidth.onblur=function(){
    if(this.value<=this.min){
        this.value=this.min;
    }
    if(this.value>=screenWidth-295){
        this.value=screenWidth-295;
    }
    width=this.value;
}
canvasHeight.onblur=function(){
    if(this.value<=this.min){
        this.value=this.min;
    }
    if(this.value>=screenHeight-15){
        this.value=screenHeight-15;
    }
    height=this.value;
}
sure.onclick = function(e){
    canvas.width = width;
    canvas.height = height;
    canvas.style.left = (screenWidth + 295 - canvas.width)/2 + "px";
    canvas.style.top = (screenHeight - 5 - canvas.height)/2 + "px";
    arr = [];
    obj.clearRect(0, 0, width, height);
    e.stopPropagation();
    create.fadeOut();
}

//清空
clear.click(function(){
    arr = [];
    obj.clearRect(0, 0, width, height)
})

//撤销
back.click(function(){
    arr.pop();
    obj.clearRect(0,0,width,height);
    if(arr.length > 0){
        //把数据图像放回画布
        obj.putImageData(arr[arr.length - 1], 0, 0, 0, 0, width, height);
    }
})

//保存
save.click(function(){
    //跳转页面，手动保存
    var reg = canvas.toDataURL("image/png");
    //直接自动保存下载
    //var reg=canvas.toDataURL("image/png").replace("image/png","image/octet-stream");
    location.href = reg;
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



//主流程
var x, y , w, h;
var lx, ly, lw, lh;
var cutDate;

canvas.onmousedown = function(e){
    x = e.offsetX;
    y = e.offsetY;
    if(type == "pen"){
        obj.beginPath();
        obj.moveTo(x,y);
    }
    if(type == "eraser"){
        obj.clearRect(x-5, y-5, 10, 10);
    }
    if(cutFlag&&type == "cut"){
        if(arr.length != 0){
            arr.splice(-1,1);
        }
    }
    //实例化构造函数
    var draw = new Draw(obj,{
        type: style,
        color: color,
        width: lineWidth
    });
    canvas.onmousemove = function(e){
        w = e.offsetX;
        h = e.offsetY;
        if(type!="eraser"){
            obj.clearRect(0, 0, width, height);
            if(arr.length != 0){
                obj.putImageData(arr[arr.length-1],0,0,0,0,width,height);                
            }
        }
        if(cutFlag&&type == "cut"){
            if(isCut){
                obj.clearRect(lx, ly, lw-lx, lh-ly);
            }
            var nx = lx + (w - x);
            var ny = ly + (h - y);
            obj.putImageData(cutDate, nx, ny);
        } else if(type == "poly"){
            draw[type](x, y, w, h, n);
        } else{
            draw[type](x, y, w, h);
        }
    }
    document.onmouseup = function(){
        canvas.onmousemove = null;
        document.onmouseup = null;
        if(type == "cut"){
            if(!cutFlag){
                cutFlag = true;
                cutDate = obj.getImageData(x+1, y+1, w-x-2, h-y-2);
                lx=x;
                ly=y;
                lw=w;
                lh=h;
                container.css({
                    display:"none"
                });
            } else{
                cutFlag = false;
                container.css({
                    display:"block"
                });
            }
        }
        //终止并保存已画的线
        arr.push(obj.getImageData(0, 0, width, height));
    }
}