
import { TypingHeading } from "../Components/Heading";
import ParticalText from "../Components/ParticalText";


export default function Home({}){

    return <div id="home" className="relative w-full sm:pt-20 max-sm:pt-10 select-none">
        <div className="w-full text-center text-[20vw] max-text-[200px] font-bold flex flex-col max-sm:hidden">
            <ParticalText text="Web Dev" className="w-full max-w-[1500px] max-h-[500px]" fontSize="100%" mouseR={100} border={9} />
            <div className="text-[.2em]  translate-y-[-5vw] flex flex-col items-center">
                <ParticalText text="Mustak Khan" className="w-full h-[120px]" fontSize="80px" border={0} mouseR={50} />
                <TypingHeading 
                    speed={20} 
                    className="text-xs text-pretty max-w-[500px] opacity-90" 
                    text="A dedicated Web Developer building scalable web applications using React, Nextjs, Node.js, Express, and MongoDB."
                />
            </div>
        </div>

        <div className="font-semibold sm:hidden">
            <div className="flex gap-5 max-sm:flex-col text-[40px]">
                <div className={'bg-blue-400 text-white px-5 rounded-full w-fit'}>Hello ,</div>    
                 <span className="opacity-70 text-[.9em]">My Name </span>
            </div>
            
            <div className="flex gap-5 items-end text-[40px]">
                is 
                <div className="flex gap-3  text-white bg-blue-400 rounded-full py-1 px-5">
                    Mustak
                </div>
            </div>

            <TypingHeading 
                speed={20} 
                className="text-xs text-pretty mt-5 max-w-[500px] opacity-70" 
                text="A dedicated Web Developer building scalable web applications using React, Nextjs, Node.js, Express, and MongoDB."
            />

        </div>
    </div>
}


