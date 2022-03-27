import {SettingTitle} from "../../../../Module/settingTitle/settingTitle";
import {userListTitleConfig} from "../../../../data/layout/accountSetting/userList/moduleConfig";
import "../../../../scss/layout/accountSettingIndex/userList/userList.css"
import {useReducer} from "react";

export function UserList(){
    [state, dispatch] = useReducer()
    return (
        <>
            <SettingTitle config={userListTitleConfig}/>
        </>
    )
}