import React, {createContext, useCallback, useEffect, useState} from "react";
import {IntlProvider} from "react-intl";
import {globalSetting} from "../setting/globalSetting";
import {defaultAdmin} from "../data/defaultAdmin";
import {en_us, zh_cn, zh_tw} from "../lang/mergeLang";

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
    const [lang, setLang] = useState("en_us")
    const [locale, setLocale] = useState(en_us as any)

    const fetchLang = useCallback((lang: string, setLocale: Function) => {
        switch (lang) {
            case "en_us":
                setLocale(en_us)
                break
            case "zh_tw":
                setLocale(zh_tw)
                break
            case "zh_cn":
                setLocale(zh_cn)
                break
            default:
                setLocale(en_us)
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