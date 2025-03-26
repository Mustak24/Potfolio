
import { TypingHeading } from "../Components/Heading";
import ParticalText from "../Components/ParticalText";
import View, { WhenVisible } from "../Components/View";


export default function Home({}){

    return <div id="home" className="relative w-full sm:pt-20 max-sm:pt-10 select-none">
        <View minWidth={600}>
            <div className="w-full text-center text-[20vw] max-text-[200px] font-bold flex flex-col">
                    <ParticalText 
                        text="Web Dev" 
                        className="w-full max-w-[1500px] max-h-[500px]" 
                        fontSize="100%" 
                        mouseR={100} 
                        border={9} 
                        pixelSize={5} 
                    
                        />
                <WhenVisible>
                    <div className="text-[.2em]  translate-y-[-5vw] flex flex-col items-center">
                        <ParticalText 
                            text="Mustak Khan" 
                            fontSize="80px" 
                            border={0} 
                            mouseR={50} 
                            gap={0}  
                            pixelSize={3}
                            className="w-full h-[120px] bg-[rgb(0,0,0,.5)]" 
                            style={{filter: "blur(1px) contrast(20)"}} 
                        />
                        <TypingHeading 
                            speed={20} 
                            className="text-xs text-pretty max-w-[500px] opacity-90" 
                            text="A dedicated Web Developer building scalable web applications using React, Nextjs, Node.js, Express, and MongoDB."
                            />
                    </div>
                </WhenVisible>
            </div>
        </View>

        <View maxWidth={600}>    
            <ParticalText 
                text="Web Dev" 
                fontSize="100px" 
                border={2} 
                pixelSize={2} 
                gap={0} 
                className="w-full h-[240px] max-h-[500px] bg-[rgb(0,0,0,.5)]" 
                style={{filter: "blur(1px) contrast(20)"}} 
            />

            <div className="font-semibold">
                <div className="flex gap-5 max-sm:flex-col text-[40px]">
                    <div className={'bg-blue-400 text-white px-5 rounded-full w-fit'}>Hello ,</div>    
                    <span className="opacity-70 text-[.9em]">My Name </span>
                </div>
                
                <div className="relative text-5xl flex items-center gap-10">
                    is
                    <div className="relative flex items-center justify-center overflow-visible">
                        <div className="w-[210px] bg-blue-400 -z-1 rounded-full h-[70px] "></div>
                        <ParticalText text="Mustak" className="absolute" fontSize="50px" pixelSize={2} border={0} mouseR={50} gap={0} />      
                    </div>
                </div>

                <TypingHeading 
                    speed={20} 
                    className="text-xs text-pretty mt-5 max-w-[360px] opacity-70" 
                    text="A dedicated Web Developer building scalable web applications using React, Nextjs, Node.js, Express, and MongoDB."
                />
            </div>
        </View>
    </div>
}


