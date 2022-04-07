import {SettingTitle} from "../../../../Module/settingTitle/settingTitle";
import {userListTitleConfig} from "../../../../data/layout/accountSetting/userList/moduleConfig";
import "../../../../scss/layout/accountSettingIndex/userList/userList.css"
import {useReducer} from "react";
import {userListReducer, userListStateInit} from "../../../../reducer/layout/accountSetting/userList/userListReducer";


export function UserList(){
    const [state, dispatch] = useReducer(userListReducer as any, userListStateInit)
    const data = {}
    return (
        <>
            <SettingTitle config={userListTitleConfig} state={state} dispatch={dispatch} data={data}/>
        </>
    )
}