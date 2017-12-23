
function Draw(obj,setting) {
    this.obj = obj;
    //获取基本属性
    this.type = setting.type||"stroke";
    this.color = setting.color||"#000";
    this.width = setting.width||"1";
}
Draw.prototype = {
    //获取颜色，宽度属性
    init:function(){
        this.obj.strokeStyle = this.color;
        this.obj.fillStyle = this.color;
        this.obj.lineWidth = this.width;
    },
    //获取位置
    rect:function(x,y,x1,y1){
        this.init();
        this.obj.beginPath();
        this.obj.rect(x,y,x1,y1);
        //判断画图类型
        if(this.type == "stroke"){
            this.obj.stroke();
        } 
        else if(this.type == "fill"){
            this.obj.fill();
        }
    },
    //画线
    line:function (x,y,x1,y1) {
        this.init();
        this.obj.beginPath();
        this.obj.moveTo(x,y);
        this.obj.lineTo(x1,y1);
        this.obj.stroke();
    },
    //画圆
    cycle:function(x,y,x1,y1,n) {
        this.init();
        var obj = this.obj;
        //半径r
        var r = Math.sqrt(Math.pow(x-x1,2) + Math.pow(y-y1,2));
        obj.save();
        obj.translate(x,y);
        obj.rotate(Math.PI/2);
        var nx = r*Math.cos(Math.PI/n);
        var ny = r*Math.sin(Math.PI/n);
        obj.beginPath();
        obj.lineCap = "round";
        obj.moveTo(nx,ny);
        for(var i = 0; i<=n; i++) {
            obj.rotate(Math.PI*2/n);
            obj.lineTo(nx,-ny);
        }
        if(this,type == "stroke") {
            this.obj.stroke();  
        }
        else if(this.type == "fill") {
            this.obj.fill();
        }
        obj.restore();
    },
    //画笔
    pen:function(x,y,x1,y1) {
        this.init();
        this.obj.save();
        this.obj.lineCap="round";
        this.obj.lineTo(x1,y1);
        this.obj.stroke();
        this.obj.restore();
    },
    //橡皮
    eraser:function(x,y,x1,y1){
        this.obj.lineCap="round";
        this.obj.clearRect(x1-5,y1-5,10,10);
    },
    //剪切
    cut:function(x,y,x1,y1){
        this.init();
        this.obj.save();
        this.obj.setLineDash([4,2]);
        this.obj.beginPath();
        this.obj.lineWidth=1;
        this.obj.rect(x,y,x1-x,y1-y);
        this.obj.stroke();
        this.obj.restore();
    }
}