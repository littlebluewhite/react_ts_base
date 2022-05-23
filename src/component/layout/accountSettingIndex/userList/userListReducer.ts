import {
    settingGeneralActionType,
    settingGeneralInit,
    settingGeneralReducer,
} from "../../../../generalReducer/settingGeneral";
import {pageControlActionType, pageControlInit, pageControlReducer} from "../../../../generalReducer/pageControl";
import {filterActionType, filterReducer} from "../../../../generalReducer/filterReducer";

export const userListStateInit = {
    ...settingGeneralInit,
    ...pageControlInit,
    filter: {"accessLevel": ""}
}

export type userListActionType =
    settingGeneralActionType
    | pageControlActionType
    | filterActionType


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
        default:
            throw new Error()
    }
}
