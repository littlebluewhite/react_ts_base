
export interface LoginProps {
    from: fromType
    messageInit: string
}

export interface fromType {
    pathname: string
}

export interface userType {
    username: string
    password: string
}

export const userDefault = {
    username: "",
    password: ""
}
