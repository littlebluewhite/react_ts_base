import {Route, Routes} from "react-router-dom";
import {ProjectArticleIndex} from "../../../../projectExtra/component/articleIndex";
import {Plugins} from "./plugins";

export function PluginsIndex() {
    return (
        <Routes>
            <Route path={"/"} element={<Plugins/>}/>
            <Route path={"*"} element={<ProjectArticleIndex/>}/>
        </Routes>
    )
}