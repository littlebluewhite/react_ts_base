import {Route, Routes} from "react-router-dom";
import {ProjectArticleIndex} from "../../../projectExtra/component/articleIndex";
import {Test1} from "./test1/test1";
import {Test2} from "./test2/test2";
import {Test3} from "./test3/test3";

export function UnderConstructionIndex() {
    return (
        <Routes>
            <Route path={"/test1/*"} element={<Test1/>}/>
            <Route path={"/test2/*"} element={<Test2/>}/>
            <Route path={"/test3/*"} element={<Test3/>}/>
            <Route path={"*"} element={<ProjectArticleIndex/>}/>
        </Routes>
    )
}