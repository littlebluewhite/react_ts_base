import {pluginsCreateActionType, pluginsCreateStateInit} from "./reducer";
import React from "react";
import {pluginsStateInit} from "../pluginsReducer";

export interface createDataType {
    Name: string
    Condition: string
}

export interface pluginsSchemasProps{
    state: typeof pluginsCreateStateInit,
    dispatch: React.Dispatch<pluginsCreateActionType>
}

export interface pluginsButtonProps{
    locationState: typeof pluginsStateInit
}