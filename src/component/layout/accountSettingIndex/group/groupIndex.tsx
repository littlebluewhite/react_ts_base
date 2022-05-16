import {Route, Routes } from "react-router-dom";
import { Group } from "./group";
import {ProjectArticleIndex} from "../../../../projectExtra/component/articleIndex";

export function GroupIndex(){
    return (
        <Routes>
            <Route path={"/"} element={<Group/>}></Route>
            <Route path={"*"} element={<ProjectArticleIndex/>}/>
        </Routes>
    )
}