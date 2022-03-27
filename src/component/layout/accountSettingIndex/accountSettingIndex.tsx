import {Route, Routes} from "react-router-dom";
import {UserListIndex} from "./userList/userListIndex";
import {GroupIndex} from "./group/groupIndex";
import {PluginsIndex} from "./plugins/pluginsIndex";
import {ProjectArticleIndex} from "../../../projectExtra/component/articleIndex";

export function AccountSettingIndex() {
    return (
        <Routes>
            <Route path={"/userList/*"} element={<UserListIndex/>}/>
            <Route path={"/group/*"} element={<GroupIndex/>}/>
            <Route path={"/plugins/*"} element={<PluginsIndex/>}/>
            <Route path={"*"} element={<ProjectArticleIndex/>}/>
        </Routes>
    )
}