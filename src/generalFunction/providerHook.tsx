import {useContext} from "react";
import {AuthContext, LangContext} from "../component/providerComponent";

export function useLang() {
    return useContext(LangContext)
}

export function useAuth() {
    return useContext(AuthContext)
}

export function useToken(){
    const auth = useContext(AuthContext)
    return auth.user.AccountInfo.token
}