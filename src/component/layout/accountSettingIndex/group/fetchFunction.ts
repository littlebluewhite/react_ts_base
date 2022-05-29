import {globalSetting} from "../../../../setting/globalSetting";

export async function fetchGroup(token: string){
    const response = await fetch(`${globalSetting.SERVER}:${globalSetting.PORT}/api/account/get_template_list_table`,{
        headers: new Headers({
            Authorization: "Bearer " + token
        })
    })
    return await response.json()
}

export async function updateGroup(token: string,data:object){
    console.log(data);
    
    const response = await fetch(`${globalSetting.SERVER}:${globalSetting.PORT}/api/account/update_template`,{
        method:"POST",
        headers: new Headers({
            Authorization: "Bearer " + token
        }),
        body:JSON.stringify(data)
    })
    return await checkFetchResult(response)
}



export async function deleteAccount(token: string,groupName: string | undefined){
    console.log("token",token);
    console.log("groupName",groupName);
    
    
    const response = await fetch(`${globalSetting.SERVER}:${globalSetting.PORT}/api/account/delete_template`,{
        method: "DELETE",
        headers: new Headers({
            Authorization: "Bearer " + token
        }),
        body:JSON.stringify({
            "DeleteTemplateName":groupName
        })
    })
    return await response.json()
}


function checkFetchResult<T extends Response>(response: T): Promise<T> {
    return new Promise(function (resolve, reject) {
        if (response.ok) {
            resolve(response)
        } else {
            reject(response)
        }
    })
}