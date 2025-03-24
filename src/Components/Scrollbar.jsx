import { useState, useEffect } from "react";
import eventHandler from "../Functions/eventHandler";

export default function Scrollbar({color='rgb(0,0,0,.7)'}){

    const [scrollbarHeight, setScrollbarHeight] = useState(0)

    let handelSrollbar =  eventHandler(() => {
        let totalHeight = document.body.scrollHeight - window.innerHeight;
        let scroll = document.body.scrollTop;
        setScrollbarHeight(scroll/totalHeight);
    }, 10)

    useEffect(() => {
        document.body.addEventListener('scroll', handelSrollbar);
        return () => document.body.removeEventListener('scroll', handelSrollbar)
      }, [])
      
    return (
        <div 
            className="w-[10px] opacity-50 fixed left-0 bottom-0 rounded-sm z-[1000]" 
            style={{
                height: `${scrollbarHeight*100}%`,
                backgroundColor: color
            }}
        ></div>
    )
}