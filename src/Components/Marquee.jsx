import { Children, useState } from "react";


export default function Marquee({children, className, animationDuration=30, direction=1}){

    const [isHover, setHover] = useState(false);

    return (<>
        <style jsx='true'>{`
            @keyframes marquee${direction} {
                0%{transform: translateX(${direction*100}%);}
                100%{transform: translateX(${-1*direction*100}%);}
            }
        `}</style>

        <div className={className}
            style={{
                position: 'relative',
                display: 'flex',
                overflow: 'hidden'
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {[0,1].map(e => {
                return (
                    <div
                        key={e} 
                        className="shrink-0 w-full flex gap-5 overflow-hidden px-3" 
                        style={{
                            minWidth: 'max-content', 
                            position: e ? 'absolute' : 'relative',
                            transform: `translateX(${e*direction*100}%)`,
                            animationName: `marquee${direction}`,
                            animationIterationCount: 'infinite',
                            animationTimingFunction: 'linear',
                            animationDuration: animationDuration + 's',
                            animationDelay: e*animationDuration/2 + 's',
                            animationPlayState: isHover ? 'paused' : 'running'
                        }}
                    >
                        {Children.toArray(children).map((e, i) => <div key={i} className="shrink-0">{e}</div>)}
                    </div>
                )
            })}
        </div>
    </>);
}
