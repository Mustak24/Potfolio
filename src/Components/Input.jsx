
export default function InputText({className='', labelColor='black', labelBg='white', label='', placeholder='', id=null, name='', color='white', bg='transparent', borderStyle='solid', borderWidth='2px'}){
    if(!id) id = String(Math.floor(Math.random()*10000));

    return <>
        <div 
            className={className} 
            style={{
                position: 'relative',
                height: label ? '52px' : '40px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '14px',
                borderStyle,
                borderWidth,
                borderColor: color,
                backgroundColor: bg
            }}
        >
           <label 
                htmlFor={id}
                className="absolute top-0 translate-y-[-50%] items-center font-semibold rounded-lg h-5 px-3 text-xs transition-all duration-200 left-[20px] whitespace-nowrap"
                style={{
                    color: labelColor,
                    backgroundColor: labelBg,
                    display: label ? 'flex' : 'none'
                
                }}
            >{label}</label>
            <input 
                id={id} 
                name={name} 
                className="outline-none flex items-center w-full h-full px-5 rounded-full pt-2" 
                type="text" 
                placeholder={placeholder}
            />
        </div>
    </>
}



export function InputTextArea({className='', labelColor='black', labelBg='white', label='', placeholder='', id=null, name='', color='white', bg='transparent', borderStyle='solid', borderWidth='2px', height='100px'}){
    if(!id) id = String(Math.floor(Math.random()*10000));

    return <>
        <div 
            className={className} 
            style={{
                position: 'relative',
                height,
                display: 'flex',
                borderRadius: '14px',
                borderStyle,
                borderWidth,
                borderColor: color,
                backgroundColor: bg,
                paddingTop: '14px'
            }}
        >
           <label 
                htmlFor={id}
                className="absolute top-0 translate-y-[-50%] items-center font-semibold rounded-lg h-5 px-3 text-xs transition-all duration-200 left-[20px] whitespace-nowrap"
                style={{
                    color: labelColor,
                    backgroundColor: labelBg,
                    display: label ? 'flex' : 'none'
                
                }}
            >{label}</label>
            <textarea 
                id={id} 
                name={name} 
                className="outline-none flex items-center w-full px-5 resize" 
                type="text" 
                placeholder={placeholder}
            />
        </div>
    </>
}
