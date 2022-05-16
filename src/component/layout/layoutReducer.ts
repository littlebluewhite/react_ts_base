import update from "immutability-helper";

export const layoutStateInit = {
    firstTopicIsOpen: true,
    secondTopicIsOpen: false
}

export type layoutActionType =
    | { type: "firstSwitch" }
    | { type: "firstOpen" }
    | { type: "firstClose" }
    | { type: "secondSwitch" }
    | { type: "secondOpen" }
    | { type: "secondClose" }

export function layoutReducer(
    state: typeof layoutStateInit, action: layoutActionType
) {
    switch (action.type) {
        case "firstSwitch":
            return update(state, {firstTopicIsOpen: {$set: !state.firstTopicIsOpen}})
        case "firstOpen":
            return update(state, {firstTopicIsOpen: {$set: true}})
        case "firstClose":
            return update(state, {firstTopicIsOpen: {$set: false}})
        case "secondSwitch":
            return update(state, {secondTopicIsOpen: {$set: !state.secondTopicIsOpen}})
        case "secondOpen":
            return update(state, {secondTopicIsOpen: {$set: true}})
        case "secondClose":
            return update(state, {secondTopicIsOpen: {$set: false}})
        default:
            throw new Error()
    }
}