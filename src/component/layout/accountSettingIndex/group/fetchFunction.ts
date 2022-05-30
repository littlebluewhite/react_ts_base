import {globalSetting} from "../../../../setting/globalSetting";
import {checkFetchResult} from "../../../../generalFunction/checkFunction";

export async function fetchGroup(token: string) {
    const response = await fetch(`${globalSetting.SERVER}:${globalSetting.PORT}/api/account/get_template_list_table`, {
        headers: new Headers({
            Authorization: "Bearer " + token
        })
    })
    return await response.json()
}

export async function updateGroup(token: string, data: object) {
    console.log(data);

    const response = await fetch(`${globalSetting.SERVER}:${globalSetting.PORT}/api/account/update_template`, {
        method: "POST",
        headers: new Headers({
            Authorization: "Bearer " + token
        }),
        body: JSON.stringify(data)
    })
    return await checkFetchResult(response)
}


export async function deleteAccount(token: string, groupName: string | undefined) {
    const response = await fetch(`${globalSetting.SERVER}:${globalSetting.PORT}/api/account/delete_template`, {
        method: "DELETE",
        headers: new Headers({
            Authorization: "Bearer " + token
        }),
        body: JSON.stringify({
            "DeleteTemplateName": groupName
        })
    })
    return await checkFetchResult(response)
}

export async function fetchDefaultGroup(token: string) {
    const response = await fetch(`${globalSetting.SERVER}:${globalSetting.PORT}/api/account/default_template`, {
        headers: new Headers({
            Authorization: "Bearer " + token
        })
    })
    return await checkFetchResult(response)
}

export async function fetchCreateGroup(token: any, createData: any, name: any) {
    const response = await fetch(`${globalSetting.SERVER}:${globalSetting.PORT}/api/account/create_template`, {
        method: "POST",
        headers: new Headers({
            Authorization: "Bearer " + token
        }),
        body: JSON.stringify({
            "NewTemplateName": name,
            "Template": [],
            ...createData
        })
    })
    return await checkFetchResult(response)
}