import React from "react";
import {pluginsActionType, pluginsStateInit} from "./pluginsReducer";
import {DataConfigType} from "../../../../Module/dataModule/schemas";

export interface pluginsLayersProps {
    dispatch: React.Dispatch<pluginsActionType>
    state: typeof pluginsStateInit
}

export interface pluginsData {
    pluginsSchemasName: string,
    fileType: 0 | 1, schemas: any
}

export interface dataModuleProps {
    data: pluginsData[]
    dispatch: React.Dispatch<pluginsActionType>
    state: typeof pluginsStateInit
    config: DataConfigType
}

export interface createFolderProps {
    dispatch: React.Dispatch<pluginsActionType>
    state: typeof pluginsStateInit
}

export interface dataRowProps {
    data: any[]
    config: DataConfigType
    dispatch: React.Dispatch<pluginsActionType>
    state: typeof pluginsStateInit
}

export interface dataElementProps {
    field: string
    value: string
    config:{
        width: string
        photo?: boolean
    }
}