import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import {ProjectArticleIndex} from "../../../../../projectExtra/component/articleIndex";
import {UserListEditor} from "./userListEditor";

export function UserListEditorIndex(){
    const locationState = useLocation().state
    return (
        <>
            {!locationState ? <Navigate to={"/layout/accountSetting/userList"}/> :
                <Routes>
                    <Route path={"/"} element={<UserListEditor/>}/>
                    <Route path={"*"} element={<ProjectArticleIndex/>}/>
                </Routes>
            }
        </>
    )
}