export const pluginsUpdateStateInit = {
    updateData: [
        {"Name": "", "Condition": ""}
    ]
}

export type pluginsUpdateActionType =
    | { type: "setUpdateData", payload: { "Name": string, "Condition": string }[] }

export function pluginsUpdateReducer(
    state: typeof pluginsUpdateStateInit, action: pluginsUpdateActionType
){
    switch (action.type){
        case "setUpdateData":
            return {...state, updateData: action.payload}
        default:
            throw new Error()
    }
}