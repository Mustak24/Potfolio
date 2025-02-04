import { useEffect, useRef, useState } from "react";

export default function Details({summary, children, className='', open=true}){

    const tag = useRef(null)
    const [isOpen, setIsOpen] = useState(open);
    const [maxHeight, setMaxHeight] = useState('')

    function handleResize(){
        const {height} = tag.current.getBoundingClientRect();
        setMaxHeight(`${Number(height) + 40}px`);
    }
    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])
 
    return <div className={`relative bg-zinc-700 text-white rounded-xl p-5 transition-all duration-100`} 
        style={{
            height: isOpen ? maxHeight : '0px'
        }}
    >
            <button 
                title="open" 
                className="h-10 bg-white text-black font-semibold w-fit px-5 flex items-center rounded-full absolute top-0 left-4 translate-y-[-50%] cursor-pointer"
                onClick={() => setIsOpen(isOpen => !isOpen)}  
            >
                {summary}
            </button>

            <div 
                ref={tag}
                className={className}
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

