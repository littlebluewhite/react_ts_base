import {SettingTitle} from "../../../../Module/settingTitle/settingTitle";
import {userListTitleConfig} from "./moduleConfig";
import "./userList.css"
import {useReducer} from "react";
import {userListReducer, userListStateInit} from "./userListReducer";
import {FilterModule} from "../../../../Module/selectModule/selectModule";
import {accessLevelFilter} from "../../../../Module/selectModule/configLibrary";
import {settingTitleDispatch, settingTitleState} from "../../../../Module/settingTitle/schemas";


export function UserList() {
    const [state, dispatch] = useReducer(userListReducer as any, userListStateInit)
    const data = {}
    return (
        <>
            <SettingTitle config={userListTitleConfig} state={state as settingTitleState} dispatch={dispatch as settingTitleDispatch} data={data}/>
            <div className={"userListFilterContainer"}>
                <FilterModule dispatch={dispatch} state={state} config={accessLevelFilter}/>
            </div>
        </>
    )
}