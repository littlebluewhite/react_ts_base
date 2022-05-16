import React, {createContext, useState} from "react";
import {globalSetting} from "../setting/globalSetting";
import {defaultAdmin} from "../generalData/defaultAdmin";
import {en_us, zh_cn, zh_tw} from "../lang/mergeLang";
import {IntlProvider} from "react-intl";

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
    let langPackage = (() => {
        switch (lang) {
            case "en_us":
                return en_us
            case "zh_tw":
                return zh_tw
            case "zh_cn":
                return zh_cn
            default:
                return en_us
        }
    })()

    return (
        <IntlProvider locale={"EN"} messages={langPackage}>
            <LangContext.Provider value={{"lang": lang, "setLang": setLang, "langPackage": langPackage}}>
                {children}
            </LangContext.Provider>
        </IntlProvider>
    )
}