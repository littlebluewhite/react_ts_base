import {sortActionType, sortInit} from "../../generalReducer/sortModule";

export interface sortModuleProps {
    config: {
        block?: string // ex: 10%
        field: sortConfigType[]
    }
    state: typeof sortInit


    dispatch(action: sortActionType): void
}

export interface sortConfigType {
    title: string
    width: string
    block?: string
}

export interface sortElementProps {
    item: sortConfigType
    state: typeof sortInit
    dispatch(action: sortActionType): void
}