export function applyCss(className, style){       
    
    if(!(className && style)) return style;

    style = style.split(' ').map(e =>{
        let i = e.indexOf('-')
        if(i == -1) return [e, ''];
        return [e.slice(0, i+1), e.slice(i+1)];
    });

    className = className.split(' ').map(e => {
        let i = e.indexOf('-')
        if(i == -1) return [e, ''];
        return [e.slice(0, i+1), e.slice(i+1)];
    });

    let obj = {};

    for(let i of style) obj[i[0]] = i[1];
    for(let i of className) obj[i[0]] = i[1];

    let result = ' ';
    for(let key in obj) result += key + obj[key] + ' ';

    return result; 
}


// export function css(className, style, s, e){
//     return className.inclueds(style.splice(s, e)) ? ' ' : ' ' + style + ' ';
// }