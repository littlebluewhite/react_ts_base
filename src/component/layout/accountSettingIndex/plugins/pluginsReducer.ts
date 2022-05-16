import {
    settingGeneralActionType,
    settingGeneralInit,
    settingGeneralReducer
} from "../../../../generalReducer/settingGeneral";
import {filterActionType, filterReducer} from "../../../../generalReducer/filterReducer";
import {sortActionType, sortReducer} from "../../../../generalReducer/sortModule";

export const pluginsStateInit = {
    ...settingGeneralInit,
    sort: ["Name", false] as [string, boolean],
    filter: {"pluginsType": ""},
}

export type pluginsActionType =
    settingGeneralActionType
    | filterActionType
    | sortActionType

export function pluginsReducer(
    state: typeof pluginsStateInit, action: pluginsActionType
) {
    const newAction = action.type.split(".")[0]
    switch (newAction) {
        case "settingGeneral":
            return settingGeneralReducer(state, action as settingGeneralActionType)
        case "filter":
            return filterReducer(state, action as filterActionType)
        case "sortModule":
            return sortReducer(state, action as sortActionType)
    }
}