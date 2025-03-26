import { useEffect, useRef } from "react";
import eventHandler from "../Functions/eventHandler";

class Pixel{
    constructor(x, y, size, color, originF, maxDis=200){
        this.x = x + Math.random()*maxDis - maxDis/2;
        this.y = y + Math.random()*maxDis - maxDis/2;
        this.size = size;
        this.color = color;
        this.origin = {x, y};
        this.originF = originF
        this.ease = Math.max(.05, .1 * Math.random())
    }

    show(ctx){
        if(!ctx) return;
        
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
        ctx.fill();
    }

    update(mouseX, mouseY, mouseR){
       
        let anyUpdate = true;
        let disFromOrigin = this.getDistance(this.origin)

        this.originF = 2 + 1.1*this.originF * disFromOrigin/mouseR

        if(disFromOrigin > this.originF){
            if(this.x > this.origin.x) this.x -= this.originF  * this.ease;
            else if(this.x < this.origin.x) this.x += this.originF * this.ease;
            
            if(this.y > this.origin.y) this.y -= this.originF * this.ease;
            else if(this.y < this.origin.y) this.y += this.originF * this.ease;
        } else {
            this.x = this.origin.x;
            this.y = this.origin.y
            anyUpdate = false
        }
        
        if(!(mouseX && mouseY)) return anyUpdate;

        let dis = this.getDistance({x: mouseX, y: mouseY})
        if(dis > mouseR * this.ease * 10) return anyUpdate;

        if(this.x < mouseX) this.x -= this.originF ;
        else if(this.x > mouseX) this.x += this.originF ;

        if(this.y < mouseY) this.y -= this.originF ;
        else if(this.y > mouseY) this.y += this.originF ;

        return anyUpdate;
    }

    getDistance(other){
        return Math.sqrt(
            Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2)
        );
    }
}


CanvasRenderingContext2D.prototype.wrapText = function(text){
    text = text.split(' ')
    let lines = [];
    let word = text[0];

    for(let i=1; i<text.length; i++){
        if(this.measureText(word + ' ' + text[i]).width > this.canvas.width){
            lines.push(word);
            word = text[i];
        } else word += " " + text[i];
    } lines.push(word);

    return lines;
}

CanvasRenderingContext2D.prototype.drawText = function(lines, x=0, y=0){
    let {width, height} = this.canvas;
    x += width/2;
    y += height/2;

    lines = this.wrapText(lines);

    let size = this.font.split(' ')[0].replace('px', '');

    for(let i=0; i<lines.length; i++){
        this.fillText(lines[i], x, y - size*(lines.length-1)/2 + i*size);
    }
}

CanvasRenderingContext2D.prototype.drawTextOutline = function(lines, x, y){
    let {width, height} = this.canvas;
    x += width/2;
    y += height/2;

    lines = this.wrapText(lines);

    let size = this.font.split(' ')[0].replace('px', '');

    for(let i=0; i<lines.length; i++){
        this.strokeText(lines[i], x, y - size*(lines.length-1)/2 + i*size);
    }
}

export default function ParticalText({text='WEB DEV', fontSize='40px', pixelColor='white', className='', pixelSize=2, mouseR=50, gap=1, border=1, originF=5, fillTextPoints=[0,0], style={}}){


    const canvas = useRef(null);
    const ctx = useRef(null);
    const particals = useRef([]);
    const mouseX = useRef(0);
    const mouseY = useRef(0);
    const needDraw = useRef(true);
    const windowWidth = useRef(Math.floor(window.innerWidth));



    function init(){

        if(!canvas.current) return;

        let {width, height} = canvas.current.getBoundingClientRect();
        width = Math.floor(width);
        height = Math.floor(height);
        
        if(Math.min(width, height) < 10) return;

        canvas.current.width = width;
        canvas.current.height = height;

        ctx.current = canvas.current.getContext('2d');

        ctx.current.font = `${fontSize} sans-serif`;
        ctx.current.textAlign = 'center';
        ctx.current.textBaseline = 'middle';
        ctx.current.lineWidth = border;
        ctx.current.fillStyle = 'white';
        ctx.current.strokeStyle = 'white';
        ctx.current.drawText(text, ...fillTextPoints);
        ctx.current.drawTextOutline(text, ...fillTextPoints);

        let {data} = ctx.current.getImageData(0, 0, width, height);

        particals.current = [];
        for(let i=0; i<height; i += pixelSize + gap){
            for(let j=0; j<width; j += pixelSize + gap){
                let index = 4*(i*width + j);
                if(index && data[index + 3])
                    particals.current.push(new Pixel(j, i, pixelSize, pixelColor, originF))
            }
        }

        ctx.current.clearRect(0,0,width, height)
    }

    function animation(){
        needDraw.current = false;

        ctx.current.clearRect(0, 0, ctx.current.canvas.width, ctx.current.canvas.height);
        for(let partical of particals.current){
            partical.show(ctx.current);
            let temp = partical.update(mouseX.current, mouseY.current, mouseR);
            needDraw.current ||= temp;
        }
        mouseX.current = null;
        mouseY.current = null;

        if(needDraw.current) requestAnimationFrame(animation);
    }

    function startAgainAnimation(){
        if(!needDraw.current) {
            needDraw.current = true;
            animation();
        }
    }

    function handleMouseMove(e){
        mouseX.current = e.offsetX;
        mouseY.current = e.offsetY;
        startAgainAnimation();
    }

    function handleTouch(e){
        let {pageX, pageY} = e.touches[0];
        let {x, y} = canvas.current.getBoundingClientRect();
        mouseX.current = pageX - x;
        mouseY.current = pageY - y;
        startAgainAnimation();
    }

    const handleResize = eventHandler(() => {
        let width = window.innerWidth;
        if(Math.abs(windowWidth.current - width) < 5) return;
        
        windowWidth.current = width;
        init();
        startAgainAnimation();
    }, 1000);


    useEffect(() => {
        if(!canvas.current) return;
        
        init()
        animation();

        canvas.current?.addEventListener('mousemove', handleMouseMove);
        canvas.current?.addEventListener('touchmove', handleTouch);
        window.addEventListener('resize', handleResize);

        return () => {
            canvas.current?.removeEventListener('mousemove', handleMouseMove);
            canvas.current?.removeEventListener('touchmove', handleTouch);
            window.removeEventListener('resize', handleResize);
        }
        
    }, []);

    return <canvas ref={canvas} className={className} style={style}></canvas>
}