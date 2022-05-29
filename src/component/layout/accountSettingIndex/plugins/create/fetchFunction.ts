import {globalSetting} from "../../../../../setting/globalSetting";
import {createDataType} from "./schemas";
import {checkFetchResult} from "../../../../../generalFunction/checkFunction";

export async function fetchCreatePlugins(token: string, layers: string[], filename: string, createData: createDataType[]){
     let url = ""
    for (let layer of layers){
        url += `${layer}__`
    }
    url += `${filename}.csv`
    const response = await fetch(`${globalSetting.SERVER}:${globalSetting.PORT}/api/account/function_plugins/${url}`, {
        method: "POST",
        headers: new Headers({
            Authorization: "Bearer " + token
        }),
        body: JSON.stringify(createData)
    })
    return await checkFetchResult(response)
}