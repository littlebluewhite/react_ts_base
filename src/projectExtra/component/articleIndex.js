import {Route, Routes, useLocation} from "react-router-dom"

export function ProjectArticleIndex() {
    const location = useLocation()
    return (
        <Routes>
            <Route path={"*"} element={
                <div>
                    {location.pathname}<br/>
                    Project Route Error
                </div>
            }/>
        </Routes>
    )
}