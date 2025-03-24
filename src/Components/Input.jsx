import { useRef, useState } from "react";
import { applyCss } from "../Functions/basic";

export default function InputText({className='', labelColor='black', labelBg='white', label='', placeholder='', id=null, name='', color='white', bg='transparent', borderStyle='solid', borderWidth='2px'}){
    if(!id) id = String(Math.floor(Math.random()*10000));

    const inputLabel = useRef(null)

    function hadleFocus(){
        if(!inputLabel.current) return;

        let {width} = inputLabel.current?.parentElement?.getBoundingClientRect();
        if(!width) return   ;

        inputLabel.current.style.right = (width - 20) + 'px';
        inputLabel.current.style.transform = 'translateX(100%) ';
    }
    
    function handleBlur(){
        if(!inputLabel.current) return;
        
        inputLabel.current.style.right = '20px';
        inputLabel.current.style.transform = 'translateX(0%)';
    }

    return <>
        <div 
            className={className} 
            style={{
                position: 'relative',
                height: label ? '48px' : '40px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '1000px',
                borderStyle,
                borderWidth,
                borderColor: color,
                backgroundColor: bg
            }}
        >
           <label 
                ref={inputLabel}
                htmlFor={id}
                className="absolute top-0 translate-y-[-50%] items-center font-semibold rounded-full h-5 px-3 text-xs transition-all duration-200 right-[20px] whitespace-nowrap"
                style={{
                    color: labelColor,
                    backgroundColor: labelBg,
                    display: label ? 'flex' : 'none'
                
                }}
            >{label}</label>
            <input 
                id={id} 
                name={name} 
                className="outline-none flex items-center w-full h-full px-5 rounded-full" 
                type="text" 
                placeholder={placeholder}
                onFocus={hadleFocus}
                onBlur={handleBlur}
            />
        </div>
    </>
}
