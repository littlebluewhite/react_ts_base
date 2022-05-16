import update from "immutability-helper";

export enum settingMode {
    watch,
    edit,
    create,
    createFold
}

export const settingGeneralInit = {
    settingMode: settingMode.watch,
    deleteModel: false,
    informationModel: false,
    search: "",
    isChange: false,
    rawData: [] as any[]
}

export type settingGeneralActionType =
    | { type: "settingGeneral.setStatus", payload: settingMode }
    | { type: "settingGeneral.setDeleteModel", payload: true | false }
    | { type: "settingGeneral.setInformationModel", payload: true | false }
    | { type: "settingGeneral.setSearch", payload: string }
    | { type: "settingGeneral.setIsChange", payload: boolean }
    | { type: "settingGeneral.setRawData", payload: any[] }


export function settingGeneralReducer(
    state: typeof settingGeneralInit, action: settingGeneralActionType
) {
    switch (action.type) {
        case "settingGeneral.setStatus":
            return update(state, {settingMode: {$set: action.payload}})
        case "settingGeneral.setDeleteModel":
            return update(state, {deleteModel: {$set: action.payload}})
        case "settingGeneral.setInformationModel":
            return update(state, {deleteModel: {$set: action.payload}})
        case "settingGeneral.setSearch":
            return update(state, {search: {$set: action.payload}})
        case "settingGeneral.setIsChange":
            return update(state, {isChange: {$set: action.payload}})
        case "settingGeneral.setRawData":
            return update(state, {rawData: {$set: action.payload}})
        default:
            throw new Error()
    }
}