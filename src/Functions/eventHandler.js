export default function eventHandler(delay, fn){
    let oldTime = Date.now();
    return (event) => {
        let currentTime = Date.now();
        if(currentTime - oldTime < delay) return;

        oldTime = currentTime;
        fn(event);
    }
}