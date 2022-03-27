import {Route, Routes } from "react-router-dom";
import {UserList} from "./userList";
import {ProjectArticleIndex} from "../../../../projectExtra/component/articleIndex";

export function UserListIndex(){
    return (
        <Routes>
            <Route path={"/"} element={<UserList/>}/>
            <Route path={"*"} element={<ProjectArticleIndex/>}/>
        </Routes>
    )
}