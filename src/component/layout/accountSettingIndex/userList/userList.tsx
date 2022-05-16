import {SettingTitle} from "../../../../Module/settingTitle/settingTitle";
import {userListTitleConfig} from "./moduleConfig";
import "./userList.css"
import {useReducer} from "react";
import {userListReducer, userListStateInit} from "./userListReducer";
import {SelectModule} from "../../../../Module/selectModule/selectModule";
import {accessLevelFilter} from "../../../../Module/selectModule/dataLibrary";


export function UserList() {
    const [state, dispatch] = useReducer(userListReducer as any, userListStateInit)
    const data = {}
    return (
        <>
            <SettingTitle config={userListTitleConfig} state={state} dispatch={dispatch} data={data}/>
            <div className={"userListFilterContainer"}>
                <SelectModule changeSelect={() => {
                }} value={""} data={accessLevelFilter}/>
            </div>
        </>
    )
}