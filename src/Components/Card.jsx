import { useEffect, useRef } from "react";

export function Card3d({effect='global', children, maxAngle=10, className, perspective='1000'}) {
    const box = useRef(null);

    const handelMouseMove = (e) => {
      if(!box.current) return;
  
      const boxPosition = box.current.getBoundingClientRect();
      const boxCenterX = boxPosition.left + boxPosition.width / 2;
      const boxCenterY = boxPosition.top + boxPosition.height / 2;
      const dx = e.clientX - boxCenterX;
      const dy = boxCenterY - e.clientY;
  
      const tiltX = (dy / window.innerHeight) * maxAngle;
      const tiltY = (dx / window.innerWidth) * maxAngle;

      box.current.style.transition = '';
      box.current.style.transform = `perspective(${perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    }

    function reset(){
      box.current.style.transition = 'all .4s';
      box.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg)`;
    }


    useEffect(()=>{
      if(effect == 'global') {        
        window.addEventListener('mousemove', handelMouseMove);
        return () => {
          window.removeEventListener('mousemove', handelMouseMove);
        }
      } 
    }, [])
  
    return (
      <div 
        ref={box} 
        className={className}
        style={{
          position: 'relative',
        }}
        onMouseMove={(e) => effect == 'local' && handelMouseMove(e)}
        onMouseLeave={() => effect == 'local' && reset()}
      >
        {children}
      </div>
    )
}




export function Card3dMove({effect='global', children, maxDic=10, className, perspective='1000', direction=1}){
  const box = useRef(null);

  const handelMouseMove = (e) => {
    if(!box.current) return;

    const boxPosition = box.current.getBoundingClientRect();
    const boxCenterX = boxPosition.left + boxPosition.width / 2;
    const boxCenterY = boxPosition.top + boxPosition.height / 2;
    const dx = e.clientX - boxCenterX;
    const dy = e.clientY - boxCenterY;

    const tiltX = (dx / window.innerWidth) * maxDic * direction;
    const tiltY = (dy / window.innerHeight) * maxDic * direction;

    box.current.style.transition = '';
    box.current.style.transform = `perspective(${perspective}px) translateX(${tiltX}px) translateY(${tiltY}px)`;
  }
  useEffect(()=>{
    if(effect == 'global') {        
      window.addEventListener('mousemove', handelMouseMove);
      return () => {
        window.removeEventListener('mousemove', handelMouseMove);
      }
    }
  }, [])

  return (
    <div 
      ref={box} 
      className={className}
      style={{
        position: 'relative',
      }}
      onMouseMove={(e) => effect == 'local' && handelMouseMove(e)}
      onMouseLeave={(e) => {
        if(effect != 'local') return;
        e.target.style.transition = 'all .4s';
        e.target.style.transform = `perspective(${perspective}px) translateX(0px) translateY(0px)`;
      }}
    >
      {children}
    </div>
  )
}


export function Card3dRotate({children, back='back', duration=300, perspective=500}){
  return <>
    <div 
      className="flex items-center justify-center group select-none w-full h-full"
      style={{perspective}}
    >
        <div 
          className="flex w-full h-full items-center justify-center relative group-hover:rotate-y-180 transform-3d"
          style={{transition: `all ${duration}ms`}}
        >
          <div className="backface-hidden rotate-y-180 w-full h-full">{back}</div>
          <div className="absolute backface-hidden w-full h-full">{children}</div>
        </div>
    </div>
  </>
}