import {globalSetting} from "../../setting/globalSetting";

export function fetchAlarmEvent(token: string): Promise<Response>{
    return fetch(`${globalSetting.SERVER}:${globalSetting.PORT}/api/IBMS/Web/V1/getAlarmEventList`, {
        headers: new Headers({
            Authorization: "Bearer " + token
        })
    })
}