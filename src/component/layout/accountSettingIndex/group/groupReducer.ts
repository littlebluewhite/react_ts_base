import {
    settingGeneralActionType,
    settingGeneralInit,
    settingGeneralReducer,
} from "../../../../generalReducer/settingGeneral";
import {sortActionType, sortReducer} from "../../../../generalReducer/sortModule";
import update from "immutability-helper";

export const groupStateInit = {
    ...settingGeneralInit,
    sort: ["group", false] as [string, boolean],
    rawData: [] as any[],
    cancelIsOpen: false
}

export type groupActionType =
    settingGeneralActionType
    | sortActionType
    | { type: "setRawData", payload: any[] }
    | { type: "setCancelIsOpen", payload: true | false }

export function groupReducer(
    state: typeof groupStateInit, action: groupActionType
) {
    const newAction = action.type.split(".")[0]
    switch (newAction) {
        case "settingGeneral":
            return settingGeneralReducer(state, action as settingGeneralActionType)
        case "sortModule":
            return sortReducer(state, action as sortActionType)
        case "setCancelIsOpen":
            return update(state, {cancelIsOpen: {$set: action.payload as boolean}})
        default:
            throw new Error()
    }
}
