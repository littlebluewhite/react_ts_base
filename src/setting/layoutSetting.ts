export const asideDownSetting =
    (() => {
        const defaultData = {
            language: true,
            privacy: true,
            terms: true,
            contact: true,
        }
        try {
            return require("../projectExtra/setting/layoutSetting").asideDownSetting || defaultData
        } catch {
            return defaultData
        }
    })()


export const headerSetting =
    (() => {
        const defaultData = {
            controlAside: true,
            navigationImage: true,
            headerTitle: true,
            notification: true,
            userIngo: true,
            userIcon: true
        }
        try {
            return require("../projectExtra/setting/layoutSetting")["headerSetting"] || defaultData
        } catch {
            return defaultData
        }
    })()


export const personalMenuSetting =
    (() => {
        const defaultData = {
            personalSetting: true,
            logOut: true
        }
        try {
            return require("../projectExtra/setting/layoutSetting").personalMenuSetting || defaultData
        } catch {
            return defaultData
        }
    })()