import { useEffect, useState } from "react"
import { FiHome } from "react-icons/fi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaCode } from "react-icons/fa";
import { MdOutlineContacts } from "react-icons/md";
import { Card3dMove } from "./Card";

export default function Navbar({}){

    const navigationRoutes = [
        ['Home', <FiHome />], 
        ['About', <IoMdInformationCircleOutline />], 
        ['Projects', <FaCode />], 
        ['Contact', <MdOutlineContacts />]
    ];

    const [navigationIndex, setNavigationIndex] = useState(0);

    function handleNavigation(){  

        const navbar = document.getElementById('navbar').firstElementChild;
        if(!navbar || navigationIndex >= navigationRoutes.length) return;

        let parentInfo = navbar.getBoundingClientRect();
        let childInfo = navbar.children[navigationIndex].getBoundingClientRect();
    
        navbar.lastElementChild.style.left = (childInfo.left - parentInfo.left) + 'px';
        navbar.lastElementChild.style.width = childInfo.width + 'px';
    }

    useEffect(() => {
        window.addEventListener('resize', handleNavigation)
        return () => removeEventListener('reset', handleNavigation)
    }, [])

    useEffect(() => {
        handleNavigation(navigationIndex);
    }, [navigationIndex])

    return <>
        <nav id="navbar" className="fixed z-[900] sm:top-10 max-sm:bottom-10">
            <Card3dMove maxDic={40} effect="local" className={'flex items-center justify-center gap-2 h-12 bg-blue-300 text-white rounded-full '}>
                {navigationRoutes.map((item, index) => {
                    return <a 
                            href={`#${item[0].toLowerCase()}`} 
                            onClick={() => setNavigationIndex(index)} 
                            key={index} 
                            className="text-sm z-2 font-semibold px-5 text-center" 
                            info-key={item}
                        >
                            <span className="max-sm:hidden">{item[0]}</span>
                            <span className="sm:hidden text-lg">{item[1]}</span>
                    </a>
                })}
                <div className="absolute h-full z-1 bg-blue-400 rounded-full transition-all duration-200"></div>
            </Card3dMove>
        </nav>
    </>
}