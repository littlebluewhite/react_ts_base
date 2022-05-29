import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import {ProjectArticleIndex} from "../../../../../projectExtra/component/articleIndex";
import {PluginsEditor} from "./pluginsEditor";

export function PluginsEditorIndex() {
    const locationState = useLocation().state
    return (<>
            {!locationState ? <Navigate to={"/layout/accountSetting/plugins"}/> :
                <Routes>
                    <Route path={"/"} element={<PluginsEditor/>}/>
                    <Route path={"*"} element={<ProjectArticleIndex/>}/>
                </Routes>
            }
        </>
    )
}