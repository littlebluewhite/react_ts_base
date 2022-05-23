export function getStyle(config:any){
    let style=[]
    for (let item in config){
        style.push({width: config[item]['width']})
    }
    return(style)
}