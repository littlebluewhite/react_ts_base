import {sortActionType, sortInit} from "../../generalReducer/sortModule";

export interface sortModuleProps {
    config: sortConfigType[]
    state: typeof sortInit


    dispatch(action: sortActionType): void
}

export interface sortConfigType {
    title: string
    style: Object
}

export interface sortElementProps {
    item: sortConfigType
    state: typeof sortInit

    dispatch(action: sortActionType): void
}