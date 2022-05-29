import React from "react";
import {filterActionType} from "../../generalReducer/filterReducer";

export interface FilterModuleType {
    value: string,
    dispatch?: React.Dispatch<filterActionType>
    config: selectConfig | Function
    additionalFunc?: (event: React.ChangeEvent<HTMLSelectElement>)=>void
    effectFunc?: Function
}


export interface optionType {
    textId: string
    value: string
}

export interface selectConfig {
    name: string
    mode: selectMode
    textId: string
    index: any
    option: optionType[]
}

export enum selectMode {
    filter,
    choice
}

export const defaultConfig = {
    name: "",
    mode: selectMode.filter,
    textId: "",
    index: {
    },
    option: [
    ]
}