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
}

export type settingGeneralActionType =
    | {type: "settingGeneral.setStatus", payload: settingMode}
    | {type: "settingGeneral.setDeleteModel", payload: true | false}
    | {type: "settingGeneral.setInformationModel", payload: true | false}


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
        default:
            throw new Error()
    }
}