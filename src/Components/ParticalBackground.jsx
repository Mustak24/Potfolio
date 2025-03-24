import { useEffect } from "react";
import { useRef } from "react"
import eventHandler from "../Functions/eventHandler";

export default function ParticalBackground({particalRedius=8, particalColor=[255,255,255,1], className='bg-black', mouseForce=5}){

    const canvas = useRef(null);
    const ctx = useRef(null);
    const maxNetDis = useRef(0);
    const mouseX = useRef(null);
    const mouseY = useRef(null);
    const mouseF = useRef(mouseForce*0.5)
    const particals = useRef([]);

    function createNetwork(particals, maxNetDis=50){
        if(!ctx.current) return;

        for(let i=0; i<particals.length; i++){
            for(let j=i+1; j<particals.length; j++){
                let dis = particals[i].getDistance(particals[j]);
                
                if(dis <= 2*particals[i].r)
                    [particals[i].v, particals[j].v] = [particals[j].v, particals[i].v]
                
                if(dis > maxNetDis) continue;

                let opacity = (1 - dis/maxNetDis);
                let color = [...particals[i].getColor()];
                color[3] = opacity;

                ctx.current.beginPath();
                ctx.current.moveTo(particals[i].x, particals[i].y);
                ctx.current.lineTo(particals[j].x, particals[j].y);
                ctx.current.strokeStyle = `rgb(${color.join(', ')})`;
                ctx.current.lineWidth = 2
                ctx.current.stroke();
            }
        }

    }


    function init(){
        ctx.current = canvas.current.getContext('2d');
        canvas.current.width = window.innerWidth;
        canvas.current.height = window.innerHeight;
        maxNetDis.current = Math.sqrt(Math.pow(canvas.current.width, 2) + Math.pow(canvas.current.height, 2))*particalRedius*.01;

        let numberOfParticals = (window.innerWidth * window.innerHeight) / (particalRedius*2000);

        particals.current = [];
        for(let i=0; i<numberOfParticals; i++){
            let x = Math.random()*canvas.current.width;
            let y = Math.random()*canvas.current.height;
            particals.current.push(new Partical(x, y, particalRedius, particalColor))
        }
    }


    function animation(){
        requestAnimationFrame(animation);
      
        if(!ctx.current || !canvas.current) return;

        ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
    
        createNetwork([...particals.current, new Partical(mouseX, mouseY, 1, particalColor)], maxNetDis.current)
    
        for(let partical of particals.current){
            partical.show(ctx.current)
            partical.update(canvas.current.width, canvas.current.height, mouseX.current, mouseY.current, 2*maxNetDis.current, mouseF.current);
        }

        mouseX.current = null;
        mouseY.current = null;
    
    }

    function handleMouseDown(){
        mouseF.current = mouseForce;
    }

    function handleMouseUp(){
        mouseF.current *= .5;
    }

    function handleMouseMove(e){
        mouseX.current = e.x;
        mouseY.current = e.y;
    }

    const handleResize = eventHandler(init, 1000);


    useEffect(() => {
        if(!canvas.current) return;

        init();
        requestAnimationFrame(animation)

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);
        }
        

    }, [canvas]);

    return <>
        <canvas 
            ref={canvas} 
            className={className}
            style={{
                position: 'fixed',
                zIndex: '-1',
                width: '100vw',
                height: '100vh',
                top: '0',
                left: '0',
            }}
        ></canvas>
    </>
}



class Partical{
    #isUpdate = true;
    #color = [0,0,0,1];

    constructor(x, y, r, color){
        this.x = x;
        this.y = y;
        this.r = r;
        this.#color = color
        this.v = [Math.random()*2 - 1, Math.random()*2 - 1];
    }

    show(ctx){
        if(!this.#isUpdate || !ctx) return;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
        ctx.fillStyle = `rgb(${this.#color.join(', ')})`;
        ctx.fill();

        this.#isUpdate = false;
    }

    update(w, h, mouseX, mouseY, mouseR, mouseF){
        this.#isUpdate = true;
        
        if(!(0 < this.x - this.r && this.x + this.r < w)) this.v[0] *= -1;
        this.x += this.v[0];

        if(!(0 < this.y - this.r && this.y + this.r < h)) this.v[1] *= -1;    
        this.y += this.v[1];

        if(!(mouseX && mouseY)) return;

        let dis = this.getDistance({x: mouseX, y: mouseY})
        if(dis > mouseR) return;

        mouseF *= 1-dis/mouseR;

        if(this.x < mouseX && this.x - mouseF - this.r > 0) this.x -= mouseF;
        else if(this.x > mouseX && this.x + mouseF + this.r < w ) this.x += mouseF;

        if(this.y < mouseY && this.y - mouseF - this.r > 0) this.y -= mouseF;
        else if(this.y > mouseY && this.y + mouseF + this.r < h ) this.y += mouseF
            

    }

    
    getDistance(other){
        return Math.sqrt(
            Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2)
        )
    }
    
    getColor(){return this.#color;}

}
