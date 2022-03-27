import {Link} from "react-router-dom";
import {notificationType} from "./schemas";
import {useCallback, useEffect, useRef, useState} from "react";
import "./notification.css"
import {useToken} from "../../function/generalHook/providerHook";
import {globalSetting} from "../../setting/globalSetting";
import {useInterval} from "../../function/generalHook/usefulHook";

export function ModuleNotify({config}: notificationType){
    const [count, setCount] = useState<number>(0)
    const controller = useRef<boolean>(false)
    const token = useToken()
    const refreshCount = useCallback(async (token)=>{
        try{
            const response = await config.api(token)
            const data = await response.json()
            setCount(data.length)
        }catch (e) {
            console.log(e)
        }
    },[config])
    useEffect(()=>{
        controller.current = true
        if(controller && globalSetting.CONNECT_SERVER){
            refreshCount(token)
        }
        return ()=>{
            controller.current = false
        }
    },[refreshCount, token])

    useInterval(()=>{
        refreshCount(token)
    }, globalSetting.SERVER_RUNNING? globalSetting.RUNNING_PERIOD: null)
    return (
        <Link to={config.link} className={"notificationModule"}>
            <div className={"svgContainer notificationSvg"} style={{backgroundImage: `url(${config.image})`}}>
            </div>
            {!!count &&
                <div className={"notificationCircle"}>
                    {count}
                </div>
            }
        </Link>
    )
}