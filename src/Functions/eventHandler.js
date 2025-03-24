export default function eventHandler(fn, delay=0){
    let timeOut = null;
    return (event) => {
        if(timeOut) clearTimeout(timeOut);
        timeOut = setTimeout(() => fn(event), delay);
    }
}