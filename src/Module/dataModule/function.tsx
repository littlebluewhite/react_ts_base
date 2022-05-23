import {clickMode} from "./schemas";

export function getButton(config:any, state:any, row:any){
    let res 
    let buttonState =objCompare(state.check,row)
    
    switch (config){
        case clickMode.close:
            res=null
            break
        case clickMode.single:
            res=<input className="radio" type="radio" name="single" checked={buttonState} readOnly></input>
            break
        case clickMode.multiple:
            res=<input className="multiple" type="checkbox" name="multiple" checked={buttonState} readOnly></input>
            break
        case clickMode.switch:
            res=<input className="bty-switch" type='checkbox' readOnly></input>
            break
    }

    return res
}

export function objCompare(variable1:any,target:object){
    for(let item in variable1){
        if(item === String(JSON.stringify(target))){
            return true
        }
    }
    return false
// export function objCompare(variable1:any,target:object){
//     for (const value in variable1) {   
//         if(JSON.stringify(target) === JSON.stringify(variable1[value])){
//             return true
//         }
//     }
//     return false
// }
}