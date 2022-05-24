import update from "immutability-helper";

export enum settingMode {
    watch,
    edit,
    create,
    createFolder
}

export const settingGeneralInit = {
    settingMode: settingMode.watch,
    search: "",
    isChange: false,
    rawData: [] as any[],
    check: {} as { [key: string]: any },
    layers: [] as string[]
}

export type settingGeneralActionType =
    | { type: "settingGeneral.setStatus", payload: settingMode }
    | { type: "settingGeneral.setSearch", payload: string }
    | { type: "settingGeneral.setIsChange", payload: boolean }
    | { type: "settingGeneral.setRawData", payload: any[] }
    | { type: "settingGeneral.setCheck", payload: { [key: string]: string } }
 | { type: "settingGeneral.setLayers", payload: string[] }


export function settingGeneralReducer(
    state: typeof settingGeneralInit, action: settingGeneralActionType
) {
    switch (action.type) {
        case "settingGeneral.setStatus":
            return update(state, {settingMode: {$set: action.payload}})
        case "settingGeneral.setSearch":
            return update(state, {search: {$set: action.payload}})
        case "settingGeneral.setIsChange":
            return update(state, {isChange: {$set: action.payload}})
        case "settingGeneral.setRawData":
            return update(state, {rawData: {$set: action.payload}})
        case "settingGeneral.setCheck":
            return update(state, {check: {$set: action.payload}})
        case "settingGeneral.setLayers":
            return update(state, {layers: {$set: action.payload as string[]}})
        default:
            throw new Error()
    }
}