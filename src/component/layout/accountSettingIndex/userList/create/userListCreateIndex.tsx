import {Route, Routes} from "react-router-dom";
import {ProjectArticleIndex} from "../../../../../projectExtra/component/articleIndex";
import {UserListCreate} from "./userListCreate";

export function UserListCreateIndex(){
    return (
        <Routes>
            <Route path={"/"} element={<UserListCreate/>}/>
            <Route path={"*"} element={<ProjectArticleIndex/>}/>
        </Routes>
    )
}