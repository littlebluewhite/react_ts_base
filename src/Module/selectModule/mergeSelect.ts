function selectMerge(){
    let result = {}
    const selectData = require("./configLibrary")
    for (let i in selectData){
        if(typeof(selectData[i]) === "object"){
            result = {...result, [i]: selectData[i]}
        }
    }
    return result
}

export const allSelectData: any = selectMerge()

export function getSelectTextId(field: string, value: string){
    return allSelectData[field]["option"][allSelectData[field]["index"][value]]["textId"]
}
