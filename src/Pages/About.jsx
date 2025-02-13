import { Card3dRotate } from "../Components/Card";
import Details from "../Components/Details";
import { Heading3d } from "../Components/Heading";
import Marquee from "../Components/Marquee";


export default function About(){
    return <div id="about" className="w-full mt-10">
        <div className="lg:hidden text-5xl text-black font-bold opacity-80">
            <Heading3d text="About - Me" perspective="25" />
        </div>
        <div className="w-full sm:bg-zinc-900  max-sm:rounded-lg rounded-4xl sm:mt-10 p-10 pb-4 flex gap-10 max-sm:flex-col max-sm:items-center sm:min-h-[400px]">
            <div className="lg:hidden flex-1 max-w-[400px] ">
                <Details summary="@Mustak24" className={'text-md text-pretty'}>
                    <p className="flex-1"> 
                        My self Mustak khan from Udaipur. I am a passionate developer always exploring and learning new technologies. 
                    </p>
                    <p className="pt-2">
                    I know Python, JavaScript, C, C++ and HTML CSS. I know React for frontend, node ans express for backend and mongoDb for Database.   
                    </p>
                </Details>
            </div>

            <div className="max-lg:hidden text-white flex-1">
                <div className="text-6xl font-semibold mb-4">@Mustak24</div>
                <div className="px-2 flex flex-col gap-10 ">
                    <p className="indent-8 px-2 max-w-[600px]" >My self Mustak khan from Udaipur. I am a passionate developer always exploring and learning new technologies. </p>
                    <div className="flex gap-10">
                        <div className="font-semibold text-lg">
                            Frontend Dev
                            <ol className="list-disc pl-5 text-md">
                                {['React', 'Next', 'Tailwind'].map((e, i) => <li key={i} className="">{e}</li>)}
                            </ol>
                        </div>
                        <div className="font-semibold text-lg">
                            Backend Dev
                            <ol className="list-disc pl-5 text-md">
                                {['Node', 'Express', 'MongoDb'].map((e, i) => <li key={i} className="">{e}</li>)}
                            </ol>
                        </div>
                        <div className="font-semibold text-lg">
                            Programming Languages
                            <ol className="list-disc pl-5 text-md">
                                {['C', 'C++', 'Python'].map((e, i) => <li key={i} className="">{e}</li>)}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col flex-1 gap-10 max-w-[400px] ">
                <Details summary="Frontend Dev" className={'flex-1'}>
                    <p className="text-sm">
                        I'm a frontend developer with a passion for creating beautiful and user-friendly interfaces.
                    </p>
                </Details>
                <Details summary="Backend Dev" className={'flex-1'}>
                    <p className="text-sm">
                        I'm a frontend developer with a passion for creating beautiful and user-friendly interfaces.
                    </p>
                </Details>
                <Details summary="UI Designer" className={'flex-1'}>
                    <p className="text-sm">
                        I'm a frontend developer with a passion for creating beautiful and user-friendly interfaces.
                    </p>
                </Details>
            </div>
        </div>
        
        <TechStake/>
        <TechStake direction={-1} />
    </div>
}

function TechStake({direction=1}){

    const info = ['c', 'cpp', 'python', 'html', 'css', 'js', 'nodejs', 'react', 'tailwind', 'ejs', 'nextjs', 'mongodb', 'jwt', 'bootstrap'].map(e => {
        return {
            name: e.length  < 5 ? e.toUpperCase() : e.substring(0,4).toUpperCase() + '...' ,
            path: `/Icons/${e}.png`
        }
    });

    return <>
        <Marquee direction={direction} className="my-10">
            <div className="flex gap-5">
                {info.map(({name, path}, i) => {
                    return (
                        <div key={i} className="size-22 hover:border-1 rounded-full p-2 border-blue-400 transition-all">
                            <Card3dRotate 
                                back={
                                    <div className="bg-blue-400 w-full h-full rounded-full flex items-center justify-center text-white font-semibold">
                                        {name}
                                    </div>
                                }>
                                <img src={path} className="w-full h-full object-cover" />
                            </Card3dRotate>
                        </div>
                    )
                })}
            </div>
        </Marquee>
    </>
}
