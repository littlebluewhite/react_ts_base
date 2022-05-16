import {useReducer} from "react";
import {pluginsReducer, pluginsStateInit} from "./pluginsReducer";
import {SettingTitle} from "../../../../Module/settingTitle/settingTitle";
import {pluginsTitleConfig} from "./moduleConfig";

export function Plugins(){
    const [state, dispatch] = useReducer(pluginsReducer as any, pluginsStateInit)
    const data = [] as any[]
    console.log(state)

    return (
        <div className={"pluginsStructure"}>
            <SettingTitle config={pluginsTitleConfig} state={state} dispatch={dispatch} data={data}/>
        </div>
    )
}