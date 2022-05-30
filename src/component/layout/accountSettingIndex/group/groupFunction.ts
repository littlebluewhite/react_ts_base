import {groupStateInit} from "./groupReducer";
import {eventSearch, eventSort} from "../../../../generalFunction/dealDataFunction";
import {useMemo, useState} from "react";

export function dealGroupData(state: typeof groupStateInit){
    const {rawData, search, sort} = state
    const searchedData = eventSearch(rawData, search)
    return eventSort(searchedData, sort)
}

// 對於開啟關閉箭頭樣式的變動
export function useFold(initial=true){
    const [isFold, setIsFold] = useState(initial)

    const foldClassName = useMemo(()=>{
        if(isFold){
            return "arrow right"
        }else{
            return "arrow down"
        }
    },[isFold])

    function changeFold(){
        setIsFold(pre=>!pre)
    }
    return {isFold, foldClassName, changeFold, setIsFold}
}


//深COPY
export function deepCopy(data:any):any{
    if(Array.isArray(data)){
        return handleArray(data)
    }else if(typeof(data)==="object"){
        return handleDict(data)
    }else{
        return data
    }
}
function handleArray(data:any){
    let result = []
    for(let datum of data){
        result.push(deepCopy(datum))
    }
    return result
}

function handleDict(data:any){
    let result = {...data}
    for(let key in data){
        result[key] = deepCopy(data[key])
    }
    return result
}



export function rangeClassName(value:any){
    if(value){
        return ""
    }else{
        return "style0"
    }
}


export function rangeArrayValue(field:any, data:any){
    if(data.includes(field)){
        return 1
    }else{
        return 0
    }
}

export function rangeArrayClassName(field:any, data:any){
    if(data.includes(field)){
        return ""
    }else{
        return "style0"
    }
}

export function mergeSelectData(mergeSchemas:any, mergeSelect:any){
    if(Array.isArray(mergeSchemas)){
        return handleMergeArray(mergeSchemas, mergeSelect)
    }else if(typeof(mergeSchemas)){
        return handleMergeDict(mergeSchemas, mergeSelect)
    }
}
function handleMergeArray(mergeSchemas:any, mergeSelect:any){
    let result:any = []
    for(let datum of Object.values<any>(mergeSelect)){
        for(let item of datum){
            if(!result.includes(item)){
                result.push(item)
            }
        }
    }
    return result
}

function handleMergeDict(mergeSchemas:any, mergeSelect:any){
    let result:any = {}
    for(let key in mergeSchemas){
        if(typeof(mergeSchemas[key])!=="object"){
            result[key] = 0.0
            for(let datum of Object.values<any>(mergeSelect)){
                if(datum[key]>0){
                    result[key] = 1.0
                    break
                }
            }
        }else{
            const newSelectData:any = {}
            for(let name in mergeSelect){
                newSelectData[name] = mergeSelect[name][key]
                if(!newSelectData[name]){
                    newSelectData[name] = deepCopy(mergeSchemas[key])
                }
            }
            result[key] = mergeSelectData(mergeSchemas[key], newSelectData)
        }
    }
    // console.log(result)
    return result
}

export function subHandleClick(field:any, setData:any, preData:any, data:any){
    const index = data.indexOf(field)
    if(index>=0){
        setData((pre:any)=>{
            const result = [...pre]
            preData.splice(index, 1)
            result.splice(index, 1)
            return result
        })
    }else{
        setData((pre:any)=>{
            const result = [...pre]
            preData.push(field)
            result.push(field)
            return result
        })
    }
}

export function handleMouse(hover:any, type:any, field:any, setIsHover:any) {
    setIsHover((pre:any) => {
            let result = {
                ...pre,
                "on": {...pre.on},
                "off": {...pre.off}
            }
            result[type][field] = hover
            return result
        }
    )
}

export function mergeClassName(type:any, hoverList:any, field:any){
    const defaultClassName = type + " circle"
    if(hoverList[type][field].length===0){
        return defaultClassName + " none"
    }else{
        return defaultClassName
    }
}

export function setDataReturn(pre:any, field:any, data:any){
    if(pre[field]===1){
        data[field] = 0
        return {...pre, [field]: 0}
    }else if(pre[field]===0){
        data[field] = 1
        return {...pre, [field]: 1}
    }
}