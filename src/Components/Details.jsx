import { useEffect, useRef, useState } from "react";
import eventHandler from "../Functions/eventHandler";
import { applyCss } from "../Functions/basic";

export default function Details({summary, children, className='', open=true}){

    const tag = useRef(null)
    const [isOpen, setIsOpen] = useState(open);
    const [maxHeight, setMaxHeight] = useState('')

    const handleResize = eventHandler(function (){
        const {height} = tag.current.getBoundingClientRect();
        setMaxHeight(`${Number(height) + 40}px`);
    }, 1000);
    
    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])
 
    return <div className={`${className} ${applyCss(className, 'bg-zinc-700 text-white rounded-xl p-5 duration-100')}`} 
        style={{
            height: isOpen ? maxHeight : '0px',
            position: 'relative',
            transitionProperty: 'all',
        }}
    >
            <div 
                title="open" 
                className="h-10 bg-white text-black font-semibold w-fit px-5 flex items-center rounded-full absolute top-0 left-4 translate-y-[-50%] cursor-pointer"
                onClick={() => setIsOpen(isOpen => !isOpen)}  
            >
                {summary}
            </div>

            <div 
                ref={tag}
                style={{
                    overflow: 'hidden',
                    scale: isOpen ? '1' : '.4',
                    opacity: isOpen ? '1' : '0',
                    position: 'relative',
                    transition: 'all .1s',
                }} 
            >
                {children}
            </div>
    </div>
}


export function DetailsCard({summary, children, className='', summaryColor='black', summaryBg='white'}){
    return <>
        <div 
            className={className + applyCss(className, 'rounded-xl p-4 pt-6 relative text-white bg-zinc-700 hover:bg-zinc-800 transition-all')} 
        >
            <div className="rounded-full px-4 py-2 flex items-center font-semibold absolute top-0 translate-y-[-50%]" 
                style={{
                    color: summaryColor, 
                    backgroundColor: summaryBg
                }}>{summary}</div>
            {children}
        </div>
    </>
}
