import {groupActionType, groupStateInit} from "./groupReducer";
import React from "react";

export interface groupsDataProps{
    data: dataType[]
    state: typeof groupStateInit
    dispatch: React.Dispatch<groupActionType>
    saveRawData:Function
}

export interface dataType {
    "groupName": string,
    "groupData": any,
    "updateTime": string
}

// export interface groupElementContainerProps{
//     data:any
//     dispatch:Function
// }

export interface groupElementContainerProps{
    data:any
    state:any
    dispatch:Function
    index:number
    handleDelete:Function
}

export interface handleGroupDataProps{
    data:any
    state:any
    dispatch:Function
    layer:number
}

export interface handleObjectProps{
    preData:any
    state:any
    layer:any
    dispatch:Function
}


export interface groupCreateProps{
    state:any
    dispatch:Function
    saveRawData:Function
    handleDelete:Function
}

export interface handleCreateGroupDataProps{
    data:any
    layer:number
}

export interface handleCreateAlarmAckProps{
    preData:any
    layer:number
}
export interface handleCreateObjectProps{
    preData:any
    layer:number
}

export interface createGroupFieldProps{
    field:any
    data:any
    layer:any
}

export interface groupFieldProps{
    field:any
    data:any
    layer:any
    state:any
    dispatch:Function
}

export interface handleAlarmAckProps{
    preData:any
    layer:any
    state:any
    dispatch:Function
}

export interface mergeDataProps{
    mergeSelect:any
    mergeData:any
}
export interface handleMergeDataProps{
    mergeSelect:any
    layer:any
    mergeData:any
}

export interface createGroupFieldProps{
    field: any
    data: any
    layer: any
}

export interface mergeGroupSelectProps{
    item:any
    index:number
    mergeSelect:any
    setMergeSelect:Function
    handleSelect:any
}
export interface mergeGroupProps{
    setIsOpen:Function
    rawData:any
    mergeSelect:any
    setCreateData:Function
    setMergeSelect:Function
    defaultDataRef:any
}

export interface handleMergeObjectProps{
    mergeSelect:any
    layer:any
    mergeData:any
}

export interface mergeGroupFieldProps{
    mergeData:any
    mergeSelect:any
    layer:any
}

export interface handleMergeAlarmAckProps{
    mergeSelect:any
    layer:any
    mergeData:any
}