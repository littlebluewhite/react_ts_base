import {updateDataType} from "./schemas";
import {globalSetting} from "../../../../../setting/globalSetting";
import {checkFetchResult} from "../../../../../generalFunction/checkFunction";

export async function fetchUpdatePlugins(token: string, layers: string[], filename: string, updateData: updateDataType[]){
     let url = ""
    for (let layer of layers){
        url += `${layer}__`
    }
    url += `${filename}`
    const response = await fetch(`${globalSetting.SERVER}:${globalSetting.PORT}/api/account/function_plugins/${url}`, {
        method: "PUT",
        headers: new Headers({
            Authorization: "Bearer " + token
        }),
        body: JSON.stringify(updateData)
    })
    return await checkFetchResult(response)
}