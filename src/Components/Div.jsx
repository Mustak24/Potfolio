import { applyCss } from "../Functions/basic";

export default function({className='', titleClassName='',children, title}){
    return <>
        <div 
            className={className + applyCss(className, 'bg-zinc-700 hover:bg-zinc-900 rounded-lg w-fit p-2') + ' group'} 
            style={{position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '50px'}}
        >
            <div className="absolute px-2 py-1 bg-zinc-700 top-full group-hover:translate-y-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300" style={{position: 'absolute'}}>{title}</div>
            {children}
        </div>
    </>
}