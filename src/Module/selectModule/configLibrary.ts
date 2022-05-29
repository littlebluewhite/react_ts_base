import {selectMode} from "./schemas";
import {fetchAccessLevel} from "./fetchFunction";

// export const accessLevelFilter = {
//     name: "accessLevel",
//     mode: selectMode.filter,
//     textId: "select.accessLevel",
//     index: {
//         "": 0,
//         "0": 1,
//     },
//     option: [
//         {textId: "select.option.all", value: ""},
//         {textId: "select.option.nadi", value: "0"}
//     ]
// }

export const fileType_filter = {
    name: "fileType_filter",
    mode: selectMode.filter,
    textId: "select.fileType",
    index: {
        "": 0,
        "0": 1,
        "1": 2,
    },
    option: [
        {textId: "select.option.all", value: ""},
        {textId: "select.option.folder", value: "0"},
        {textId: "select.option.csv", value: "1"}
    ]
}


// ex:
//     const selectModuleConfig = async ()=>{
//         return await accessLevelFilter(token, selectMode.filter)
//     }
export const accessLevelSelect = async (token: string, mode: selectMode = selectMode.filter)=> {
    const data = await fetchAccessLevel(token)
    const dealData = {"value": Object.keys(data), "textId": Object.values(data)}
    const dataIndex = {} as any
    const option = [] as any[]
    let name
    let resultMode
    if (mode === selectMode.filter) {
        dealData.value.unshift("")
        dealData.textId.unshift("All")
        name = "accessLevel_filter"
        resultMode = selectMode.filter
    }else{
        name = "accessLevel_choice"
        resultMode = selectMode.choice
    }
    // console.log(dealData)
    dealData.value.map((item, index) => (
        dataIndex[item.toString()] = index
    ))
    dealData.textId.map((item: any, index) => {
        if (item === "All") {
            option.push({
                textId: "select.option.all", "value": ""
            })
        } else {
            option.push({
                "textId": item[0], "value": dealData.value[index]
            })
        }
        return null
    })
    return {
        name: name,
        mode: resultMode,
        textId: "select.accessLevel",
        index: dataIndex,
        option: option
    }
}