import {globalSetting} from "../../setting/globalSetting";
import {selectMode} from "./schemas";
import {checkFetchResult} from "../../generalFunction/checkFunction";

export async function fetchAccessLevel(token: string){
    try{
        const response = await fetch(`${globalSetting.SERVER}:${globalSetting.PORT}/api/account/get_template_list`, {
                method: "GET",
                headers: new Headers({
                    Authorization: "Bearer " + token
                })
            })
        const response2 = await checkFetchResult(response)
        return await response2.json()

    }catch (e){
        console.log(e)
    }
}
