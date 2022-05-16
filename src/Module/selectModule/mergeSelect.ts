function selectMerge(){
    let result = {}
    const selectData = require("./dataLibrary")
    for (let i in selectData){
        result = {...result, [i]: selectData[i]}
    }
    return result
}

export const allSelectData: any = selectMerge()