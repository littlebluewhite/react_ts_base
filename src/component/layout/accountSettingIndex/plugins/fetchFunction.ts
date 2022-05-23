import {globalSetting} from "../../../../setting/globalSetting";
import {checkFetchResult} from "../../../../generalFunction/checkFunction";

export async function fetchPluginsSchemas(token: string){
    const response = await fetch(`${globalSetting.SERVER}:${globalSetting.PORT}/api/account/function_plugins`,{
        headers: new Headers({
            Authorization: "Bearer " + token
        })
    })
    const response2 = await checkFetchResult(response)
    return await response2.json()
}

export async function fetchCreateFolder(folderName: string | undefined, layers: string[], token: string){
    const response = await fetch(`${globalSetting.SERVER}:${globalSetting.PORT}/api/account/function_plugins_folder`,{
        method: "POST",
        headers: new Headers({
            Authorization: "Bearer " + token
        }),
        body: JSON.stringify({
            "folder_name": folderName,
            "layers": layers
        })
    })
    return await checkFetchResult(response)
}