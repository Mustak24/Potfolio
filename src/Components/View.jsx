import { useEffect, useRef, useState } from "react"
import eventHandler from "../Functions/eventHandler";

export default function View({children, minWidth=0, maxWidth=Infinity}){
    const [isLoad, setLoad] = useState(minWidth < window.innerWidth && window.innerWidth < maxWidth);

    function handleLoad(){
        setLoad(minWidth < window.innerWidth && window.innerWidth < maxWidth);
    }
    
    const handleResize = eventHandler(handleLoad, 1000)
    
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <>
        {isLoad ? children : null}
    </>
}


export function WhenVisible({children, gap=400}){

    const [isVisible, setVisible] = useState(true);
    
    const box = useRef(null);
    const isBoxResize = useRef(true);
    const windowWidth = useRef(Math.floor(window.innerWidth));

    function handleScroll(){
        if(!box.current) return;

        let {top, bottom} = box.current.getBoundingClientRect();
        let {innerHeight: height} = window
        let visible = !(top > height + gap || bottom < -gap);

        setVisible(visible);
    }

    function setBoxSize(){
        if(!(box.current && isBoxResize.current)) return;
  
        box.current.style.height = 'auto';

        let {height} = box.current.getBoundingClientRect();
        box.current.style.height = height + 'px';
        isBoxResize.current = false;

        handleScroll();
    }

    const handleResize = eventHandler(() => {

        let currentWindowWidth = Math.floor(window.innerWidth);
        if(Math.abs(windowWidth.current - currentWindowWidth) < 5) return;
        
        windowWidth.current = currentWindowWidth

        isBoxResize.current = true;
        if(isVisible) return setBoxSize();
        
        setVisible(true);
    }, 500);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        document.body.addEventListener('scroll', handleScroll);

        return () => {
            document.body.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    useEffect(setBoxSize, [isVisible])

    return <div ref={box}>{isVisible ? children : null}</div>
}

export function AnimateWhenVisible({children, gap=0 , className='', from={opacity: '0'}, to={opacity: '1'}, delay=100}){

    const box = useRef(null);
    const timeOut = useRef(null);
    const [style, setStyle] = useState(from);

    function handleStyle(newStyle){

        if(timeOut.current) clearTimeout(timeOut)
        timeOut.current = setTimeout(() => {
            setStyle(() => newStyle);
        }, delay);
    }

    function handleScroll(){
        if(!box.current) return;

        let {top, bottom} = box.current.getBoundingClientRect();
        let {innerHeight: height} = window
        let visible = (top + gap < height && bottom > -gap);

        if(visible) handleStyle(to);
        else handleStyle(from);
    }

    useEffect(() => {
        document.body.addEventListener('scroll', handleScroll);
        return () => document.body.removeEventListener('scroll', handleScroll);
    }, [])

    return <div ref={box} style={style} className={className}>{children}</div>
}



export function SlidingTextAnimationView({text, animationDuration=500, animationDelay=25, className=''}) {
    return (
        <div className="flex items-center overflow-hidden">
            {text.split('').map((char, index) => (
                <div key={index} className={className}
                    style={{
                        animationName: 'animation-translate-y-100-0, animation-opacity-0-1',
                        animationDuration: `${animationDuration}ms`,
                        animationDelay: `${index * animationDelay}ms`,
                        animationFillMode: 'forwards',
                        transform: 'translateY(100%)',
                        visibility: char === ' ' ? 'hidden' : 'visible'
                    }}
                >{char === ' ' ? '_' : char}</div>
            ))}
        </div>
    )
}



export function SlidingTextAnimationViewOnHover({text, animationDuration=500, animationDelay=25, className='', containerClassName=''}) {
    
    const [isHover, setHover] = useState(false);

    return (
        <div 
            onMouseEnter={() => setHover(true)} 
            onMouseLeave={() => setHover(false)} 
            className={containerClassName}
            style={{display: 'flex', alignItems: 'center', overflow: 'hidden'}}
        >
            {text.split('').map((char, index) => (
                <div key={index}
                    className="relative flex flex-col" 
                    style={{
                        viewTransitionName: `all`,
                        transitionDuration: `${animationDuration}ms`,
                        transitionDelay: `${index * animationDelay}ms`,
                        transform: isHover ? `translateY(-100%)` : 'translateY(0%)',
                        visibility: char === ' ' ? 'hidden' : 'visible',
                    }}
                >
                    <div className={className} >{char === ' ' ? '_' : char}</div>
                    <div className={`absolute translate-y-[100%] ${className}`} >{char === ' ' ? '_' : char}</div>
                </div>
            ))}
        </div>
    )
}