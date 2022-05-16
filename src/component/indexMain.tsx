import {HashRouter, Navigate, Route, Routes, useLocation} from "react-router-dom";
import {AuthProvider, LangProvider} from "./providerComponent";
import {useAuth} from "../generalFunction/providerHook";
import React from "react";
import {LoginIndex} from "./login/loginIndex";
import {TokenLoginIndex} from "./tokenLogin/tokenLoginIndex";
import {LayoutIndex} from "./layout/layoutIndex";

interface RequireAuthProps {
    children: React.ReactElement
    needAuth?: boolean
    pathTo?: string
}

// 是否需要看權限登錄或重定向
function RequireAuth(
    {children, needAuth = true, pathTo = "/login"}: RequireAuthProps
): React.ReactElement {
    const location = useLocation()
    const auth = useAuth()
    if (!!auth?.user === needAuth) {
        return children
    } else {
        return <Navigate to={pathTo} replace state={{from: location}}/>
    }
}

function IndexMain() {
    // console.log("index main")
    return (
        <HashRouter>
            <AuthProvider>
                <LangProvider>
                    <Routes>
                        <Route path={"/login"} element={
                            <RequireAuth needAuth={false} pathTo={"/layout"}>
                                <LoginIndex/>
                            </RequireAuth>
                        }/>
                        <Route path={"/tokenLogin/*"} element={<TokenLoginIndex/>}/>
                        {/*<Route path={"/handleError"} element={<HandleError/>}/>*/}
                        <Route path={"/*"} element={
                            <RequireAuth>
                                <LayoutIndex/>
                            </RequireAuth>
                        }/>
                    </Routes>
                </LangProvider>
            </AuthProvider>
        </HashRouter>
    )
}

export {IndexMain}