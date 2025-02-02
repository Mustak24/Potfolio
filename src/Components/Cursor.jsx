import { useState } from "react";
import { useEffect } from "react";

export default function Cursor({size=80}){
   
    const [speed, setSpeed] = useState(0.1);


    function handelCursor(e) {
        const cursor = document.getElementById('cursor')
        if(!cursor) return;

        cursor.style.display = (
          e.pageX < 10 || e.pageX > window.innerWidth - 10 || 
          e.pageY < 10 || e.pageY > window.innerHeight - 10) ? 'none' : 'block';
        cursor.style.top = e.pageY + 'px';
        cursor.style.left = e.pageX + 'px';


        let dic = Math.sqrt((e.pageX - (this.x || 0)) ** 2 + (e.pageY - (this.y || 0)) ** 2)
        let time = Date.now() - (this.t || 0);

        setSpeed((dic / time) > 1 ? 1 : dic / time * 2)      
        
        this.x = e.pageX;
        this.y = e.pageY;
        this.t = Date.now();
    }
    
      useEffect(() => {
        window.addEventListener('mousemove', handelCursor)
        return () => {
          window.removeEventListener('mousemove', handelCursor)
        }
      }, [])

   
   return <div id='cursor' className='max-sm:hidden mix-blend-difference bg-white rounded-full fixed translate-x-[-50%] translate-y-[-50%]'
      style={{
        scale: `${speed < 1 ? 1 : speed*3}`,
        transition: 'scale 1s',
        mixBlendMode: 'difference',
        width: size + 'px',
        aspectRatio: 1
      }}
   ></div>
}