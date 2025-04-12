import { useEffect, useRef } from "react"


export default function Cursor({className, maxSpeed=25}){

  const cursor = useRef(null);
  const pos = useRef({x: window.innerWidth/2, y: window.innerHeight/2});
  const vel = useRef({x: 0, y: 0});
  const acc = useRef({x: 0, y: 0});
  const mouseX = useRef(window.innerWidth/2);
  const mouseY = useRef(window.innerHeight/2);
  const isMoving = useRef(false);
  
  // Damping factor to reduce oscillation
  const damping = 0.85;
  
  // Spring constant for smoother acceleration
  const springConstant = 0.15;
  
  function magnitude({x, y}){
    return Math.sqrt(x*x + y*y);
  }

  function validTag(tag){
    
    while(tag){
      let {dataset} = tag;
      tag = tag.parentElement;
      if(!dataset) continue;
      if(dataset.cursor) return dataset;
    }

    return false;
  }

  function move(){
    if(!cursor.current) {
      isMoving.current = false;
      return;
    }

    update();
    cursor.current.style.left = pos.current.x + 'px';
    cursor.current.style.top = pos.current.y + 'px';
    
    if(isMoving.current) requestAnimationFrame(move)
  }


  function update(){
    if(!mouseX.current || !mouseY.current || !pos.current || !vel.current || ! acc.current) return;

    let dx = mouseX.current - pos.current.x;
    let dy = mouseY.current - pos.current.y;
    let m = magnitude({x: dx, y: dy});

    if(m < 0.5) {
      pos.current.x = mouseX.current;
      pos.current.y = mouseY.current;
      vel.current.x = 0;
      vel.current.y = 0;
      return;
    } 
    
    // Apply spring force
    acc.current.x = dx * springConstant;
    acc.current.y = dy * springConstant;
    
    // Update velocity with damping
    vel.current.x = vel.current.x * damping + acc.current.x;
    vel.current.y = vel.current.y * damping + acc.current.y;
    
    // Apply max speed limit
    let vm = magnitude(vel.current);
    if(vm && vm > maxSpeed){
      vel.current.x *= maxSpeed/vm;
      vel.current.y *= maxSpeed/vm;
    }
    
    // Update position
    pos.current.x += vel.current.x;
    pos.current.y += vel.current.y;
  }


  function handleMouseMove(e){
    let dataset = validTag(e.target)
    let {pageX: x, pageY: y} = e;
    
    mouseX.current = x;
    mouseY.current = y;
    
    if(!cursor.current) return;
    
    if(!dataset){
      isMoving.current = false;
      cursor.current.style.scale = '0.2';
      cursor.current.style.opacity = '0';
      pos.current = {x, y};
      return;
    }

    if(isMoving.current) return;

    cursor.current.style.scale = '1';
    cursor.current.style.opacity = '1';
    cursor.current.innerText = dataset.cursortext || 'click'
    isMoving.current = true;
    move();
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