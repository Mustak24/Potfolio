import { useEffect, useRef } from "react"


export default function Cursor({className}){

  const cursor = useRef(null);
  const pos = useRef({x: window.innerWidth/2, y: window.innerHeight/2});
  const mouseX = useRef(window.innerWidth/2);
  const mouseY = useRef(window.innerHeight/2);
  
  function validTag(tag){
    
    while(tag){
      let {dataset} = tag;
      tag = tag.parentElement;
      if(!dataset) continue;
      if(dataset.cursor) return dataset;
    }

    return false;
  }


  function handleMouseMove(e){
    let dataset = validTag(e.target)
    let {pageX: x, pageY: y} = e;
    
    mouseX.current = x;
    mouseY.current = y;
    
    if(!cursor.current) return;
    
    pos.current = {x, y};

    if(!dataset){
      cursor.current.style.scale = '0.2';
      cursor.current.style.opacity = '0';
      return;
    }

    cursor.current.style.scale = '1';
    cursor.current.style.opacity = '1';
    cursor.current.innerText = dataset.cursortext || 'click'
    cursor.current.style.left = pos.current.x + 'px';
    cursor.current.style.top = pos.current.y + 'px';
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [])

   
  return  <div 
      ref={cursor} 
      className={className}
      style={{
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        transition: 'opacity .2s, scale .2s',
        transformOrigin: '0px 0px'
      }}></div>
}