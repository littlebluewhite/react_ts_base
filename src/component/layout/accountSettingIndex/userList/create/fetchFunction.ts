import {globalSetting} from "../../../../../setting/globalSetting";
import {checkFetchResult} from "../../../../../generalFunction/checkFunction";

export async function fetchCreateAccount(token: string, data: any){
    const response = await fetch(`${globalSetting.SERVER}:${globalSetting.PORT}/api/account/register`, {
        method: "POST",
        headers: new Headers({
            Authorization: "Bearer " + token
        }),
        body: JSON.stringify({
            "Account": data.username,
            "Password": data.password,
            "Name": data.name,
            "SubCompany": data.subCompany,
            "CompanyId": "CCAU",
            "ProductId": "CCAU",
            "ProjectId": "",
            "Description": "",
            "Group": data.group,
            "RoleGroup": data.group,
            "Language": "CN",
            "Address": data.address,
            "PhoneNumber": data.phone,
            "Email": data.email
        })
    })
    const response2 = await checkFetchResult(response)
    return await response2.json()
}