import {
    settingGeneralActionType,
    settingGeneralInit,
    settingGeneralReducer,
} from "../../../../generalReducer/settingGeneral";
import {pageControlActionType, pageControlInit, pageControlReducer} from "../../../../generalReducer/pageControl";

export const userListStateInit = {
    ...settingGeneralInit,
    ...pageControlInit,
    filterCondition: {"accessLevel": ""}
}

export type userListActionType =
    settingGeneralActionType
    | pageControlActionType


export function userListReducer(
    state: typeof userListStateInit, action: userListActionType
) {
    const newAction = action.type.split(".")[0]
    switch (newAction) {
        case "settingGeneral":
            return settingGeneralReducer(state, action as settingGeneralActionType)
        case "pageControl":
            return pageControlReducer(state, action as pageControlActionType)
        default:
            throw new Error()
    }
}
