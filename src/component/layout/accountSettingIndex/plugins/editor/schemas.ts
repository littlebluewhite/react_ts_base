import {pluginsUpdateActionType, pluginsUpdateStateInit} from "./reducer";
import {pluginsStateInit} from "../pluginsReducer";

export interface updateDataType {
    Name: string
    Condition: string
}

export interface pluginsSchemasProps{
    state: typeof pluginsUpdateStateInit,
    dispatch: React.Dispatch<pluginsUpdateActionType>
}

export interface pluginsButtonProps{
    locationState: typeof pluginsStateInit
}