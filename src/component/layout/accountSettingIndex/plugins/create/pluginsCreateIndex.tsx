import {Route, Routes} from "react-router-dom";
import {ProjectArticleIndex} from "../../../../../projectExtra/component/articleIndex";
import {PluginsCreate} from "./pluginsCreate";

export function PluginsCreateIndex() {
    return (
        <Routes>
            <Route path={"/"} element={<PluginsCreate/>}/>
            <Route path={"*"} element={<ProjectArticleIndex/>}/>
        </Routes>
    )
}