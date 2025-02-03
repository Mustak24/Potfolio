
import Button from "../Components/Buttton";
import { Card3d, Card3dMove } from "../Components/Card";
import { TypingHeading } from "../Components/Heading";
import { FaArrowLeft } from "react-icons/fa";
import { BsBalloonHeartFill } from "react-icons/bs";
import projetsInfo from '../assets/all-projects-data.json';
import AutoSlider from "../Components/AutoSlider";
import { LuCalendarClock } from "react-icons/lu";
import { FaCode } from "react-icons/fa";


export default function Home({}){
    return <div id="home" className="relative flex flex-wrap gap-10 justify-between w-full sm:pt-40 max-sm:pt-10 select-none">
        <div className="font-semibold ">
            <div className="flex gap-5 max-sm:flex-col text-[40px]">
                <Card3dMove direction={-1} className={'bg-blue-400 text-white px-5 rounded-full w-fit'}>Hello ,</Card3dMove>    
                 <span className="opacity-70 text-[.9em]">My Name <span className="sm:hidden">is</span></span>
            </div>
            
            <div className="text-[40px]">
                <div className="max-sm:hidden flex gap-5 items-end mt-5">
                    is 
                    <Card3dMove effect="local" className="flex gap-3 text-3xl sm:text-[50px] text-white bg-blue-400 rounded-full py-1 px-5 sm:px-10">
                        <div className="flex">{
                            "Mustak".split('').map((char, index) => <Card3d key={index} perspective="50">{char}</Card3d>)
                        }</div>
                        <div className="flex">{
                            "Khan".split('').map((char, index) => <Card3d key={index} perspective="20">{char}</Card3d>)
                        }</div>
                    </Card3dMove>
                </div>
                <div className="sm:hidden text-blue-400">
                    <TypingHeading text="Mustak Khan"/>
                </div>
            </div>

            <TypingHeading 
                speed={20} 
                className="text-xs text-pretty mt-2 sm:mt-5 max-w-[500px] opacity-70" 
                text="A dedicated Web Developer building scalable web applications using React, Nextjs, Node.js, Express, and MongoDB."
            />

            <div className="text-sm mt-5 sm:mt-10 animate-bounce">
                <Button onClick={() => window.location = '#Contact'} className="cursor-pointer" text="royalblue">GET IN TOCH</Button>
            </div>
        </div>

        <div className="min-w-[250px] flex-1 flex flex-col sm:items-end items-center gap-5 pb-5">
            <div className="w-full max-w-[500px] flex justify-end">
                <div className="bg-sky-500 rounded-full w-fit px-5 h-10 flex items-center gap-3 text-lg font-semibold text-white">
                    <FaArrowLeft />
                    Journey
                </div>
            </div>

            <Card3d effect="local" maxAngle={20} className="relative w-full min-w-[200px] max-w-[500px] sm:max-w-[800px] max-h-[400px] bg-white rounded-md p-2 px-3 overflow-hidden">

                <TypingHeading speed={40} className="font-serif">
                    {'All thing that Build With'.split('').map((c, i) => <span key={i}>{c}</span>)}
                    <BsBalloonHeartFill className="inline mx-1 text-red-500" />
                    {'by @Mustak24'.split('').map((c, i) => <span key={i}>{c}</span>)}
                </TypingHeading>
                
                <div className="overflow-hidden w-full relative">
                    <AutoSlider>
                    {
                        Object.values(projetsInfo).flat(1).map((info, index) => 
                            <ProjectCard 
                                key={index} 
                                title={info.title} 
                                img={info.img}   
                                link={info.codeScr}
                                about={info.about} 
                            />)
                    }
                    </AutoSlider>
                </div>
                
            </Card3d>
        </div>
    </div>
}


function ProjectCard({title, time='_ _/_ _/_ _ _ _', img, link, about}){
    return <div className="pt-2 w-full">
        <div className="flex justify-between items-center w-full pb-1">
            <a href={link} title="view code" target="_blank" className="flex items-center gap-1 text-sm font-bold text-blue-500 hover:underline">
                <FaCode />
                {title}
            </a>
            <div className="text-xs flex gap-2 pr-2">
                {time}
                <LuCalendarClock />
            </div>
        </div>
        
        <div className="flex items-center justify-center w-full h-fit group relative overflow-hidden rounded-md">
            <div className="w-full z-1 max-h-[300px] aspect-video relative flex items-center justify-center">
                <img src={img} alt="" className="object-fill w-full h-full blur-lg" />
                <img src={img} alt="" className="object-contain h-full absolute" />
            </div>
            <div className="absolute z-2 text-xl text-white w-full h-full bg-[rgb(0,0,0,.8)] p-2 transition-all duration-100 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 group-hover:translate-y-0 translate-y-full line-clamp-4 sm:line-clamp-5">{about}</div>
        </div>
    </div>
}