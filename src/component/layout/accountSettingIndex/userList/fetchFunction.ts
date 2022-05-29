import {globalSetting} from "../../../../setting/globalSetting";
import {checkFetchResult} from "../../../../generalFunction/checkFunction";

export async function fetchUserList(token: string){
    const response = await fetch(`${globalSetting.SERVER}:9005/api/IBMS/Web/V1/report/account`,{
        headers: new Headers({
            Authorization: "Bearer " + token
        })
    })
    const response2 = await checkFetchResult(response)
    return await response2.json()
}

export async function fetchDeleteAccount(token: string, account: string){
    const response = await fetch(`${globalSetting.SERVER}:${globalSetting.PORT}/api/account/delete`, {
        method: "DELETE",
        headers: new Headers({
            Authorization: "Bearer " + token
        }),
        body: JSON.stringify({
            "Account": account
        })
    })
    const response2 = await checkFetchResult(response)
    return await response2.json()
}