import {Navigate, Route, Routes, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useEffect, useRef} from "react";
import {fetchSelfTemplate, fetchTokenLogin} from "../login/loginFetch";
import {successLogin} from "../login/loginFunction";
import {useLocalStorage} from "../../generalFunction/usefulHook";
import {useAuth} from "../../generalFunction/providerHook";

function TokenLoginIndex() {
    // console.log("token login index")
    return (
        <Routes>
            <Route path={"/"} element={
                <Navigate to={"/login"} state={
                    {messageInit: "Error: No token in path"}} replace/>}/>
            <Route path={"/:token"} element={<TokenLogin/>}/>
        </Routes>
    )
}

function TokenLogin() {
    const token: any = useParams().token
    const navigate = useNavigate()
    const from = useSearchParams()[0].get("from") || "/layout"
    const setStorageToken = useLocalStorage("token", "")[1]
    const auth = useAuth()
    const controller = useRef<boolean>(true)
    useEffect(() => {
        (async () => {
            try {
                const response = await fetchTokenLogin(token)
                const data = await response.json()
                const resultData = await successLogin(data)
                resultData.AccountInfo.token = token
                const response2 = await fetchSelfTemplate(token)
                const data2 = await response2.json()
                if(controller.current){
                    setStorageToken(token)
                    auth.signIn({...resultData, ...data2}, () => {
                    })
                    navigate(from, {replace: true})
                }
            } catch (e) {
                console.log(e)
                localStorage.removeItem("token")
                navigate("/login")
            }
        })()
        return (()=>{
            controller.current = false
        })
    }, [auth, setStorageToken, navigate, from, token])
    return null
}

export {TokenLoginIndex}