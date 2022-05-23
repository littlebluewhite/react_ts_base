import update from "immutability-helper";

//預設值
export const dataInit = {
    check: {} as object
}

export type dataActionType =
    { type: "dataModule.setSingle" | "dataModule.setMultiple" | "dataModule.unsetMultiple", payload: object}

export function dataReducer(
    state: typeof dataInit, action: dataActionType
) {
    switch (action.type) {
        case "dataModule.setSingle":
            return update(state, {check: {$set: action.payload}})
        case "dataModule.setMultiple":
            return update(state, {check: {$merge: action.payload}})
        case "dataModule.unsetMultiple":
            //有值得時候
            return update(state, {check: {$unset:[String(Object.keys(action.payload))]}})
        default:
            throw new Error()
    }
}