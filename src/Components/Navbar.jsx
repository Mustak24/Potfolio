import { useEffect, useRef, useState } from "react"
import { FiHome } from "react-icons/fi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaCode } from "react-icons/fa";
import { MdOutlineContacts } from "react-icons/md";
import { Card3dMove } from "./Card";
import eventHandler from "../Functions/eventHandler";
import { SlidingTextAnimationViewOnHover } from "./View";

export default function Navbar({routes}){
    routes = [
        {name: 'Home', icon: <FiHome />, id: 'home', url: '#home'},
        {name: 'About', icon: <IoMdInformationCircleOutline />, id: 'about', url: '#about'},
        {name: 'Projects', icon: <FaCode />, id: 'projects', url: '#projects'},
        {name: 'Contact', icon: <MdOutlineContacts />, id: 'contact', url: '#contact'},
    ];

    const [navigationIndex, setNavigationIndex] = useState(0);
    const navbarBox = useRef(null)
    const routesInfo = useRef(null);



    function handleNavigation(navigationIndex){  
        const navbar = navbarBox.current.firstElementChild;
        if(!navbar || !routesInfo.current) return;

        navigationIndex = (navigationIndex + routes.length)%routes.length;

        let parentInfo = navbar.getBoundingClientRect();
        let childInfo = navbar.children[navigationIndex].getBoundingClientRect();
    
        navbar.lastElementChild.style.left = (childInfo.left - parentInfo.left) + 'px';
        navbar.lastElementChild.style.width = childInfo.width + 'px';
    }

    function gotoRoute(index){
        if(!routesInfo.current) return;
        document.body.scroll({behavior: 'smooth', top: routesInfo.current[index].top});
    }

    const handleResizeEvent = eventHandler(function (){
        return handleNavigation(navigationIndex);
    }, 1000);

    const handleNavigationOnScroll = function (){
        if(!routesInfo.current) return;
        
        let {scrollTop} = document.body;

        for(let i=0; i<routes.length; i++){
            let {top, bottom} = routesInfo.current[i];
            if(top <= scrollTop + 100 && scrollTop + 100 < bottom) 
                return setNavigationIndex(i);
        }
    }

    useEffect(() => {
        routesInfo.current = routes.map(({id}) => {
            let {top, bottom} = document.getElementById(id)?.getBoundingClientRect();
            return {top, bottom};
        });

        window.addEventListener('resize', handleResizeEvent);
        document.body.addEventListener('scroll', handleNavigationOnScroll);
        return () => {
            window.removeEventListener('resize', handleResizeEvent);
            document.body.removeEventListener('scroll', handleNavigationOnScroll);
        }
    }, [])

    useEffect(() => {
        handleNavigation(navigationIndex);
    }, [navigationIndex])

   

    return <>
        <nav ref={navbarBox} id="navbar" className="fixed z-[900] sm:top-10 max-sm:bottom-10">
            <Card3dMove maxDic={40} effect="local" className={'flex items-center justify-center gap-2 h-12 bg-blue-400 text-white rounded-full'}>
                {routes.map((item, index) => {
                    return <a 
                            key={index} 
                            onClick={() => gotoRoute(index)} 
                            className="text-sm z-2 font-semibold px-5 text-center cursor-pointer flex flex-col items-center justify-center" 
                        >
                            <span className="sm:hidden text-md">{item.icon}</span>
                            <SlidingTextAnimationViewOnHover 
                                text={item.name} animationDuration={300} className="max-sm:text-[10px]" 
                            />
                    </a>
                })}
                <div className="absolute h-full z-1 bg-black border-3 border-white rounded-full transition-all duration-200"></div>
            </Card3dMove>
        </nav>
    </>
}