import { useEffect, useRef, useState } from "react";


export default function Button({children, isLoading=false, loadingInnerHTML='Wait ...', className='', text='black', bg='white', title='Click', onClick=()=>{}, disabled=false }) {

    const button = useRef(null);
    const [scale, setScale] = useState(0);

    useEffect(() => {
        if(!button.current) return;
        setScale(button.current.offsetWidth/4)
    }, [button.current]);
    
    return (
        <button ref={button}
            className={`${className} relative z-[1] font-bold overflow-hidden shadow-[0_0_10px_rgb(0,0,0,.3)] px-5 min-h-10 rounded-full flex items-center justify-center flex-col text-center transition-all duration-500 text-[var(--text)] max-sm:active:text-[var(--bg)] sm:hover:text-[var(--bg)] bg-[var(--bg)] sm:hover:bg-transparent max-sm:active:bg-transparent active:after:content-[''] after:border-2 after:border-[var(--text)] after:self-start after:z-[-1] after:rounded-full before:content-[''] before:self-end before:z-[-1] before:border-2 before:border-[var(--text)] before:rounded-full before:transition-all after:transition-all max-sm:active:before:scale-[var(--scale)] max-sm:active:after:scale-[var(--scale)] sm:hover:before:scale-[var(--scale)] sm:hover:after:scale-[var(--scale)]`}
            style={{ '--bg': bg, '--text': text, '--scale':scale }}
            onClick={onClick || function () {}}
            disabled={disabled || isLoading}
        >
            {
                isLoading ?
                    (
                        <div className="flex items-center gap-2">
                            <div className='min-w-5 aspect-square rounded-full border-[6px] animate-spin transition-all sm:duration-300 border-[var(--text)] border-t-[var(--bg)]'
                            style={{ '--bg': bg, '--text': text }}
                            ></div>
                            <div>{loadingInnerHTML}</div>
                        </div>
                    ) : children || title
            }
        </button>
    )
}