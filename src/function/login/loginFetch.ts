import {globalSetting} from "../../setting/globalSetting";

interface loginUser {
    username: string
    password: string
}
function fetchLogin(user: loginUser){
    return fetch(`${globalSetting.SERVER}:${globalSetting.PORT}/api/login`, {
        method: "POST",
        body: JSON.stringify({
            "Username": user.username,
            "Password": user.password
        })
    })
}

function fetchSelfTemplate(token: string){
    return fetch(`${globalSetting.SERVER}:${globalSetting.PORT}/api/account/get_self_account_template`, {
        method: "GET",
        headers: new Headers({
            Authorization: "Bearer " + token
        }),
    })
}

function fetchTokenLogin(token: string){
    return fetch(`${globalSetting.SERVER}:${globalSetting.PORT}/api/login_with_token`, {
        method: "GET",
        headers: new Headers({
            Authorization: "Bearer " + token
        }),
    })
}

export {fetchLogin, fetchSelfTemplate, fetchTokenLogin}