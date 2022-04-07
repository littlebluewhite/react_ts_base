import {
    settingGeneralActionType,
    settingGeneralInit,
    settingGeneralReducer,
} from "../../../general/settingGeneral";
import {pageControlActionType, pageControlInit, pageControlReducer} from "../../../general/pageControl";

export const userListStateInit = {
    ...settingGeneralInit,
    ...pageControlInit,
}

export type userListActionType =
    settingGeneralActionType
    | pageControlActionType
    | { type: "f" }
    | { type: "g" }


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
