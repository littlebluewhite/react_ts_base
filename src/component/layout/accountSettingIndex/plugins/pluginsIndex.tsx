import {Route, Routes} from "react-router-dom";
import {ProjectArticleIndex} from "../../../../projectExtra/component/articleIndex";
import {Plugins} from "./plugins";
import {PluginsCreateIndex} from "./create/pluginsCreateIndex";
import {PluginsEditorIndex} from "./editor/pluginsEditorIndex";

export function PluginsIndex() {
    return (
        <Routes>
            <Route path={"/"} element={<Plugins/>}/>
            <Route path={"/create"} element={<PluginsCreateIndex/>}/>
            <Route path={"/editor"} element={<PluginsEditorIndex/>}/>
            <Route path={"*"} element={<ProjectArticleIndex/>}/>
        </Routes>
    )
}