export default function eventHandler(fn, delay=0){
    let oldTime = Date.now();
    return (event) => {
        let currentTime = Date.now();
        if(currentTime - oldTime < delay) return;

        oldTime = currentTime;
        fn(event);
    }
}