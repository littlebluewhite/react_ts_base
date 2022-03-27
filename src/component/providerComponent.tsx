import React, {createContext, useCallback, useEffect, useState} from "react";
import EN from "../lang/EN.json";
import CN from "../lang/CN.json";
import EN_EXTRA from "../projectExtra/lang/EN.json";
import CN_EXTRA from "../projectExtra/lang/CN.json";
import {IntlProvider} from "react-intl";
import {globalSetting} from "../setting/globalSetting";
import {defaultAdmin} from "../data/defaultAdmin";

const AuthContext = createContext<any>({})

const LangContext = createContext<any>({})

export {AuthContext, LangContext}

// 提供權限全域值
export function AuthProvider({children}: { children: React.ReactNode }) {
    const initial = globalSetting.IS_DEVELOP ? defaultAdmin : null
    const [user, setUser] = useState<typeof defaultAdmin | null>(initial)
    const signIn = (data: typeof defaultAdmin, callback: VoidFunction) => {
        setUser(data)
        callback()
    }
    const signOut = (callback: VoidFunction) => {
        setUser(null)
        callback()
    }
    let value = {user, signIn, signOut}

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// 提供語言全域值
export function LangProvider({children}: { children: React.ReactNode }) {
    const [lang, setLang] = useState("EN")
    const [locale, setLocale] = useState(EN)

    const fetchLang = useCallback((lang: string, setLocale: Function) => {
        switch (lang) {
            case "EN":
                const mergeEN = {...EN, ...EN_EXTRA}
                setLocale(mergeEN)
                break
            case "CN":
                const mergeCN = {...CN, ...CN_EXTRA}
                setLocale(mergeCN)
                break
            default:
                setLocale(EN)
        }
    }, [])

    useEffect(() => {
        fetchLang(lang, setLocale)
    }, [lang, setLocale, fetchLang])
    return (
        <IntlProvider locale={"EN"} messages={locale}>
            <LangContext.Provider value={{"lang": lang, "setLang": setLang}}>
                {children}
            </LangContext.Provider>
        </IntlProvider>
    )
}