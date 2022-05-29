export const pluginsCreateStateInit = {
    createData: [
        {"Name": "", "Condition": ""}
    ],
    filename: ""
}

export type pluginsCreateActionType =
    | { type: "setCreateData", payload: { "Name": string, "Condition": string }[] }
    | { type: "setFilename", payload: string }

export function pluginsCreateReducer(
    state: typeof pluginsCreateStateInit, action: pluginsCreateActionType
){
    switch (action.type){
        case "setCreateData":
            return {...state, createData: action.payload}
        case "setFilename":
            return {...state, filename: action.payload}
        default:
            throw new Error()
    }
}