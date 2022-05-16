import {globalSetting} from "../../../../setting/globalSetting";

export async function fetchGroup(token: string){
    const response = await fetch(`${globalSetting.SERVER}:${globalSetting.PORT}/api/account/get_template_list_table`,{
        headers: new Headers({
            Authorization: "Bearer " + token
        })
    })
    return await response.json()
}