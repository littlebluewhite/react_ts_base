import {dataActionType, dataInit} from "../../generalReducer/dataReducer";

export interface dataModuleProps {
    config:any
    data:object[]
    style:object[]
    state:typeof dataInit
    dispatch(action: dataActionType): void
}

export interface dataContainerProps {
    config:any
    row:object
    style:object[]
    state:typeof dataInit
    dispatch(action: dataActionType): void
}

export interface dataElementProps {
    element:string
    style:object
}

export enum clickMode{
    close,
    single,
    multiple,
    switch,
}

export interface DataConfigType {
    createFolder?: boolean
    noDataTextId: string
    clickMode: clickMode
    checkKey?: string
    rowPhoto?: string // look which field
    row: {
        [key: string]: {
            width: string,
            photo?: boolean
        }
    }
}