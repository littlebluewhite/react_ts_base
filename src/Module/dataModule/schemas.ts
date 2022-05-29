import {settingGeneralActionType, settingGeneralInit} from "../../generalReducer/settingGeneral";
import React from "react";

export interface dataModuleProps {
    config: DataConfigType
    data: any[]
    state: typeof settingGeneralInit
    dispatch: React.Dispatch<settingGeneralActionType>
}

export interface dataRowProps {
    data: any[]
    config: DataConfigType
    dispatch: React.Dispatch<settingGeneralActionType>
    state: typeof settingGeneralInit
}

export interface dataElementProps {
    field: string
    value: string
    config: elementConfigType
}

export enum clickMode {
    close,
    single,
    multiple,
    switch,
}

export interface DataConfigType {
    noDataTextId: string
    clickMode: clickMode
    checkKey?: string
    rowPhoto?: rowPhotoType
    row: {
        [key: string]: elementConfigType
    }
}

export interface elementConfigType {
    width: string,
    photo?: boolean
    type?: elementType
}

export enum elementType {
    default, // text + value
    text,
    value,
    time
}

export interface rowPhotoType {
    field: string // look which field
    item?: {
        [key: string]: {
            hoverTextId?: string
            clickFunc?: Function
        }
    }
}

export interface createFolderProps {
    dispatch: React.Dispatch<settingGeneralActionType>
    state: typeof settingGeneralInit
}

export interface rowPhotoProps {
    item: any
    rowPhoto: rowPhotoType
}