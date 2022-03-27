export const globalSetting =
    (() => {
        const defaultData = {
            CONNECT_SERVER: false,
            SERVER_RUNNING: false,
            RUNNING_PERIOD: 2000, // 毫秒
            IS_DEVELOP: true,
            PHOTO_DEFAULT: true,

            // dev
            SERVER: "http://20.48.113.161",

            // alpha
            // SERVER: "http://20.188.9.63",

            // according to server
            // SERVER: "http://"+ window.location.host

            // SERVER: "http://127.0.0.1",

            PORT: 9322
        }
        try {
            return require("../projectExtra/setting/globalSetting").globalSetting || defaultData
        } catch {
            return defaultData
        }
    })()