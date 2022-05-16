import {groupActionType, groupStateInit} from "./groupReducer";
import React from "react";

export interface groupsDataProps{
    data: dataType[]
    state: typeof groupStateInit
    dispatch: React.Dispatch<groupActionType>
}

export interface dataType {
    "groupName": string,
    "groupData": any,
    "updateTime": string
}