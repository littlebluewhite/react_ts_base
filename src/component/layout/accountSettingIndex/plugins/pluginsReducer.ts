import {
    settingGeneralActionType,
    settingGeneralInit,
    settingGeneralReducer
} from "../../../../generalReducer/settingGeneral";
import {filterActionType, filterReducer} from "../../../../generalReducer/filterReducer";
import {sortActionType, sortReducer} from "../../../../generalReducer/sortModule";
import {pageControlActionType, pageControlInit, pageControlReducer} from "../../../../generalReducer/pageControl";
import update from "immutability-helper";

export const pluginsStateInit = {
    ...settingGeneralInit,
    ...pageControlInit,
    sort: ["pluginsSchemasName", false] as [string, boolean],
    filter: {"fileType": ""},
    layers: [] as string[]
}

export type pluginsActionType =
    | { type: "setLayers", payload: string[] }
    | settingGeneralActionType
    | pageControlActionType
    | filterActionType
    | sortActionType

export function pluginsReducer(
    state: typeof pluginsStateInit, action: pluginsActionType
) {
    const newAction = action.type.split(".")[0]
    switch (newAction) {
        case "settingGeneral":
            return settingGeneralReducer(state, action as settingGeneralActionType)
        case "pageControl":
            return pageControlReducer(state, action as pageControlActionType)
        case "filter":
            return filterReducer(state, action as filterActionType)
        case "sortModule":
            return sortReducer(state, action as sortActionType)
        case "setLayers":
            return update(state, {layers: {$set: action.payload as string[]}})
    }
}