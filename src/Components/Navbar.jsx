import { useEffect, useRef, useState } from "react"
import { FiHome } from "react-icons/fi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaCode } from "react-icons/fa";
import { MdOutlineContacts } from "react-icons/md";
import { Card3dMove } from "./Card";

export default function Navbar({navigationRoutesInfo}){

    const [navigationIndex, setNavigationIndex] = useState(0);
    const navbarBox = useRef(null)

    navigationRoutesInfo = [
        {name: 'Home', icon: <FiHome />, id: 'home', url: 'home'},
        {name: 'About', icon: <IoMdInformationCircleOutline />, id: 'about', url: 'about'},
        {name: 'Projects', icon: <FaCode />, id: 'projects', url: 'projects'},
        {name: 'Contact', icon: <MdOutlineContacts />, id: 'contact', url: 'contact'},
    ];

    function handleNavigation(navigationIndex){  
        const navbar = navbarBox.current.firstElementChild;
        if(!navbar || navigationIndex >= navigationRoutesInfo.length) return;

        let parentInfo = navbar.getBoundingClientRect();
        let childInfo = navbar.children[navigationIndex].getBoundingClientRect();
    
        navbar.lastElementChild.style.left = (childInfo.left - parentInfo.left) + 'px';
        navbar.lastElementChild.style.width = childInfo.width + 'px';
    }

    function handleResizeEvent(){
        return handleNavigation(navigationIndex);
    }

    function handleNavigationOnScroll(){
        let pagesInfo = navigationRoutesInfo.map(({id}) => 
            document.getElementById(id)?.getBoundingClientRect()?.top
        );

        for(let i=0; i<pagesInfo.length; i++){
            let top = pagesInfo[pagesInfo.length - i - 1];
            if(-200 < top && top < 200) 
                return setNavigationIndex(pagesInfo.length - i - 1);
        }
    }

    useEffect(() => {
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
            <Card3dMove maxDic={40} effect="local" className={'flex items-center justify-center gap-2 h-12 bg-blue-300 text-white rounded-full '}>
                {navigationRoutesInfo.map((item, index) => {
                    return <a 
                            key={index} 
                            href={item.url || `#${item.name.toLowerCase()}`} 
                            onClick={() => setNavigationIndex(index)} 
                            className="text-sm z-2 font-semibold px-5 text-center" 
                        >
                            <span className="max-sm:hidden">{item.name}</span>
                            <span className="sm:hidden text-lg">{item.icon}</span>
                    </a>
                })}
                <div className="absolute h-full z-1 bg-blue-400 rounded-full transition-all duration-200"></div>
            </Card3dMove>
        </nav>
    </>
}