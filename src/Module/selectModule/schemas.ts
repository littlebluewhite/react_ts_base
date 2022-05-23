import React from "react";
import {filterActionType} from "../../generalReducer/filterReducer";

export interface FilterModuleType {
    state: any,
    dispatch: React.Dispatch<filterActionType>
    config: {
        name: string
        id: string
        textId: string
        index: any
        option: optionType[]
    }
}

export interface optionType {
    textId: string
    value: string
}
