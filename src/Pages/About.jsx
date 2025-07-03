
import Details from "../Components/Details";
import Marquee from "../Components/Marquee";
import { SlidingTextAnimationView, SlidingTextAnimationViewOnHover, WhenVisible } from "../Components/View";


export default function About(){
    return <div id="about" className="w-full mt-10">

        <div className="w-full sm:bg-zinc-900  max-sm:rounded-lg rounded-4xl sm:mt-10 sm:p-10 pb-4 flex gap-10 max-sm:flex-col max-sm:items-center sm:min-h-[400px]">
            <div className="lg:hidden flex-1 max-w-[400px] ">
                <div className="relative bg-zinc-700 text-white rounded-xl p-5 h-full flex flex-col gap-5 pt-10">
                    <span className="absolute top-0 translate-y-[-50%] bg-white px-5 rounded-full text-black h-10 flex items-center font-semibold">@Mustak</span>
                    
                    <p className="bg-zinc-900 p-4 rounded-xl"> 
                        My self Mustak khan from Udaipur. I am a passionate developer always exploring and learning new technologies. 
                    </p>
                    
                    <p className="bg-zinc-900 p-4 rounded-xl">
                    I know Python, JavaScript, C, C++ and HTML CSS. I know React for frontend, node ans express for backend and mongoDb for Database.   
                    </p>
                </div>
            </div>

            <div className="max-lg:hidden text-white flex-1">
                <div className="w-fit mb-4 cursor-default" >
                    <SlidingTextAnimationViewOnHover  className="text-6xl font-semibold" text={'@Mustak24'} />
                </div>
                <div className="px-2 flex flex-col gap-10 ">
                    <p className="indent-8 px-2 max-w-[600px]" >My self Mustak khan from Udaipur. I am a passionate developer always exploring and learning new technologies. </p>
                    
                    <div className="flex gap-10">
                        <div className="font-semibold text-xs">
                            <Details summary="Frontend Dev" className={'flex-1'}>
                                <div className="text-lg w-[120px]">
                                    {['React', 'Next', 'Tailwind', 'React Native'].map((e, i) => <p key={i} ># {e}</p>)}
                                </div>
                            </Details>
                        </div>

                        <div className="font-semibold text-xs">
                            <Details summary="Backend Dev" className={'flex-1'}>
                                <div className="text-lg w-[120px]">
                                    {['Node', 'Express', 'MongoDb', 'Mongoose'].map((e, i) => <p key={i} ># {e}</p>)}
                                </div>
                            </Details>
                        </div>

                        <div className="font-semibold text-xs">
                            <Details summary="Programming Languages" className={'flex-1'}>
                                <div className="text-lg w-[180px]">
                                    {['C', 'C++', 'Python', 'TypeScript'].map((e, i) => <p key={i} ># {e}</p>)}
                                </div>
                            </Details>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col flex-1 gap-10 max-w-[400px] ">
                <div>
                    <Details summary="Frontend Dev" className={'flex-1'}>
                        <p className="text-sm">
                            I'm a frontend developer with a passion for creating beautiful and user-friendly interfaces.
                        </p>
                    </Details>
                </div>

                <div>
                    <Details summary="Backend Dev" className={'flex-1'}>
                        <p className="text-sm">
                            I'm a frontend developer with a passion for creating beautiful and user-friendly interfaces.
                        </p>
                    </Details>
                </div>

                <div>
                    <Details summary="UI Designer" className={'flex-1'}>
                        <p className="text-sm">
                            I'm a frontend developer with a passion for creating beautiful and user-friendly interfaces.
                        </p>
                    </Details>
                </div>
            </div>
        </div>
        
        <TechStake/>
        <TechStake direction={-1} />
    </div>
}

function TechStake({direction=1}){

    const info = ['c', 'cpp', 'python', 'html', 'css', 'js', 'nodejs', 'react', 'tailwind', 'ejs', 'nextjs', 'mongodb', 'jwt', 'bootstrap'].map(e => {
        return {
            name: e.toUpperCase(),
            path: `/Icons/${e}.png`
        }
    });

    return <>
        <Marquee direction={direction} className="my-10">
            <div className="flex gap-5">
                {info.map(({name, path}, i) => {
                    return (
                        <div key={i} className="p-2 relative flex items-center justify-center group">
                            <div className="size-22 rounded-full relative transition-all duration-200 hover:rotate-[360deg]">
                                <img src={path} className="w-full h-full object-cover" />
                            </div>
                            <p className={"absolute h-7 text-sm font-semibold px-2 flex items-center rounded-md bg-white text-black z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 " + `group-hover:translate-y-[${-direction*100}%]`} 
                                style={direction == -1 ? {top: '100%'} : {bottom: '100%'}}    
                            >{name}</p>
                        </div>
                    )
                })}
            </div>
        </Marquee>
    </>
}
