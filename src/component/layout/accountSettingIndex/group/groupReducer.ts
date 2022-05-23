import {
    settingGeneralActionType,
    settingGeneralInit,
    settingGeneralReducer,
} from "../../../../generalReducer/settingGeneral";
import {sortActionType, sortReducer} from "../../../../generalReducer/sortModule";
import update from "immutability-helper";
import {pageControlActionType, pageControlInit, pageControlReducer} from "../../../../generalReducer/pageControl";

export const groupStateInit = {
    ...settingGeneralInit,
    ...pageControlInit,
    sort: ["group", false] as [string, boolean],
    rawData: [] as any[],
    cancelIsOpen: false
}

export type groupActionType =
    settingGeneralActionType
    | pageControlActionType
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
        case "pageControl":
            return pageControlReducer(state, action as pageControlActionType)
        case "setCancelIsOpen":
            return update(state, {cancelIsOpen: {$set: action.payload as boolean}})
        default:
            throw new Error()
    }
}
