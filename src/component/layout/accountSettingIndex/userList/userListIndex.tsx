import {Route, Routes } from "react-router-dom";
import {UserList} from "./userList";
import {ProjectArticleIndex} from "../../../../projectExtra/component/articleIndex";
import {UserListCreateIndex} from "./create/userListCreateIndex";
import {UserListEditorIndex} from "./editor/userListEditorIndex";

export function UserListIndex(){
    return (
        <Routes>
            <Route path={"/"} element={<UserList/>}/>
            <Route path={"/create"} element={<UserListCreateIndex/>}/>
            <Route path={"/editor"} element={<UserListEditorIndex/>}/>
            <Route path={"*"} element={<ProjectArticleIndex/>}/>
        </Routes>
    )
}