import update from "immutability-helper";

export const pageControlInit = {
    current: 1,
    pageSize: 50,
    showSizeChanger: true,
    pageSizeOptions: [20, 50],
}

export type pageControlActionType =
    | { type: "pageControl.setCurrent", payload: number }
    | { type: "pageControl.setPageSize", payload: number }
    | { type: "pageControl.setShowSizeChanger", payload: true | false }
    | { type: "pageControl.setPageSizeOptions", payload: number[] }

export function pageControlReducer(
    state: typeof pageControlInit, action: pageControlActionType
) {
    switch (action.type) {
        case "pageControl.setCurrent":
            return update(state, {current: {$set: action.payload}})
        case "pageControl.setPageSize":
            return update(state, {pageSize: {$set: action.payload}})
        case "pageControl.setShowSizeChanger":
            return update(state, {showSizeChanger: {$set: action.payload}})
        case "pageControl.setPageSizeOptions":
            return update(state, {pageSizeOptions: {$set: action.payload}})
        default:
            throw new Error()
    }
}