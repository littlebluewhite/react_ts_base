import {
    settingGeneralActionType,
    settingGeneralInit,
    settingGeneralReducer,
} from "../../../../generalReducer/settingGeneral";
import {pageControlActionType, pageControlInit, pageControlReducer} from "../../../../generalReducer/pageControl";
import {filterActionType, filterReducer} from "../../../../generalReducer/filterReducer";
import {sortActionType, sortReducer} from "../../../../generalReducer/sortModule";

export const userListStateInit = {
    ...settingGeneralInit,
    ...pageControlInit,
    filter: {"accessLevel": ""},
    sort: ["username", false] as [string, boolean]
}

export type userListActionType =
    | settingGeneralActionType
    | pageControlActionType
    | filterActionType
    | sortActionType


export function userListReducer(
    state: typeof userListStateInit, action: userListActionType
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
        default:
            throw new Error()
    }
}
