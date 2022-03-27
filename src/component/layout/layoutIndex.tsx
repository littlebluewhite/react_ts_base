import {Navigate, Route, Routes} from "react-router-dom";
import React from "react";
import {Layout} from "./layout";

export function LayoutIndex() {
    return (
        <Routes>
            <Route path={"/"} element={
                <Navigate to={"/layout"}/>}/>
            <Route path={"/layout/*"} element={<Layout/>}/>
        </Routes>
    )
}