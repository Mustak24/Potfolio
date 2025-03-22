import { useEffect, useState } from "react"
import eventHandler from "../Functions/eventHandler";

export default function View({children, minWidth=0, maxWidth=Infinity}){
    const [isLoad, setLoad] = useState(minWidth < window.innerWidth && window.innerWidth < maxWidth);

    function handleLoad(){
        setLoad(minWidth < window.innerWidth && window.innerWidth < maxWidth);
    }
    
    const handleResize = eventHandler(1000, handleLoad)
    
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <>
        {isLoad ? children : null}
    </>
}