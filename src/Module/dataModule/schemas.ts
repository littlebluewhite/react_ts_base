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
    config: {
        width: string
        photo?: boolean
    }
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
        [key: string]: {
            width: string,
            photo?: boolean
        }
    }
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

export interface rowPhotoProps{
    item: any
    rowPhoto: rowPhotoType
}