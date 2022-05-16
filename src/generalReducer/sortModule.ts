import update from "immutability-helper";

//預設值
export const sortInit = {
    sort: ['title',false] as [string, boolean]
}

export type sortActionType =
    { type: "sortModule.setSort", payload: [string, boolean]}

export function sortReducer(
    state: typeof sortInit, action: sortActionType
) {
    switch (action.type) {
        case "sortModule.setSort":
            return update(state, {sort: {$set: action.payload}})
        default:
            throw new Error()
    }
}