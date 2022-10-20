
class Canvas{
    
    constructor(canvasElem,btnClear){
        this.canvas = document.getElementById("canvas");
        this.fromXY = {x:null,y:null};
        this.toXY = {x:null,y:null};
        this.dot={};
        this.arrLine = [];
        this.arrDots = [];
        this.btnClear = document.getElementById("btnClear");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.onclick = this.clickHandler.bind(this);
        this.canvas.onmousemove = this.moveHandler.bind(this);
        this.btnClear.onclick = this.btnCollapseClear.bind(this);
        
    }
    btnCollapseClear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.arrLine = [];
        this.arrDots = [];
    }
    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    reset(){
        this.fromXY = {x:null,y:null};
        this.toXY = {x:null,y:null};
    }
    clickHandler(e){

        if(this.fromXY.x === null){
            this.fromXY.x = e.clientX;
            this.fromXY.y = e.clientY;
          }else{
            let cor = {
                fromXY : this.fromXY,
                toXY:this.toXY
            }
            this.arrLine.push(cor);
            
           
            this.arrLine.map(el=>{

                this.dot = this.getIntersection(this.fromXY,this.toXY,el.fromXY,el.toXY);
                if(this.dot){
                    this.arrDots.push(this.dot);
                }
                
            })
            this.reset();
          }


    }
    moveHandler(e){

        if(this.fromXY.x !== null){
            this.toXY.x = e.clientX;
            this.toXY.y = e.clientY;
            this.draw();
          }
    }

    drawDot(point){
        this.ctx.beginPath();
        this.ctx.fillStyle = "red";
        this.ctx.arc(point.x,point.y,4,0,Math.PI*2);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }

    draw(){
        this.clear();
        this.ctx.beginPath();
        this.ctx.moveTo(this.fromXY.x, this.fromXY.y);
        this.ctx.lineTo(this.toXY.x, this.toXY.y);
        this.ctx.stroke();
        this.ctx.closePath();
        this.arrLine.map(el=>{
            console.log(el);
            this.ctx.beginPath();
            this.ctx.moveTo(el.fromXY.x, el.fromXY.y);
            this.ctx.lineTo(el.toXY.x, el.toXY.y);
            this.ctx.stroke();
            this.ctx.closePath();
            this.dot = this.getIntersection(this.fromXY,this.toXY,el.fromXY,el.toXY);
            if(this.dot){
                this.drawDot(this.dot);
            }
            
        })
        this.arrDots.map(el=>{
            this.drawDot(el)
        })
    }

    getIntersection(A,B,C,D){
        const tTop = (D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
        const bottom = (D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);
        const uTop = (C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
        if(bottom!=0){
            const t = tTop/bottom;
            const u = uTop/bottom;
            if(t>=0 && t<=1 && u>=0 && u<=1){
                return{
                    x:this.lerp(A.x,B.x,t),
                    y:this.lerp(A.y,B.y,t)
                }
            }
        }
        return null;
    }

    lerp(A,B,t){
        return A+(B-A)*t;
    }
}

// let can = new Canvas("canvas","btnClear");


window.onload = function(){
    let can = new Canvas("canvas","btnClear");
}

