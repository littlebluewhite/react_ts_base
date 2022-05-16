// example
import update from "immutability-helper";

export const filterInit = {
    filter: {"filterName1": "condition1", "filterName2": "condition2"} as any
}

export type filterActionType = {
    type: "filter.setFilter",
    payload: {
        field: string,
        condition: string
    }
}

export function filterReducer(
    state: typeof filterInit, action: filterActionType
){
    switch (action.type){
        case "filter.setFilter":
            return update(state, {filter: {[action.payload.field]: {$set: action.payload.condition}}})
        default:
            throw new Error()
    }
}