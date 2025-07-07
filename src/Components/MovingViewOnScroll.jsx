import { useEffect, useRef } from "react";


export default function MovingViewOnScroll({children, range=100, speed=10, className=''}) {

    const view = useRef(null);

    function handleScroll() {
        if(!view.current) return;

        const {innerHeight: height} = window;
        const {top, bottom} = view.current.getBoundingClientRect();
        if(top > innerHeight || bottom < 0) return;


        const pos = ((top - height/2) * speed) / 100;
        const translateY = pos < 0 ? Math.max(-range, pos) : Math.min(range, pos)

        view.current.style.transform = `translatey(${translateY}px)`;
    }

    useEffect(() => {
        document.body.addEventListener('scroll', handleScroll);
        return () => document.body.removeEventListener('scroll', handleScroll);
    }, [])

    return (
        <div ref={view} className={className} >
            {children}
        </div>
    )
}