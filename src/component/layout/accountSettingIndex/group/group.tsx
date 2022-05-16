import React, {useCallback, useEffect, useMemo, useReducer, useRef} from "react";
import {SettingTitle} from "../../../../Module/settingTitle/settingTitle";
import {groupActionType, groupReducer, groupStateInit} from "./groupReducer";
import {groupSortConfig, groupTitleConfig} from "./moduleConfig";
import "./group.css"
import {SortModule} from "../../../../Module/sortModule/sortModule";
import {sortInit} from "../../../../generalReducer/sortModule";
import {dealGroupData} from "./groupFunction";
import {fetchGroup} from "./fetchFunction";
import {useToken} from "../../../../generalFunction/providerHook";
import {SaveCancelControl} from "../../../../Module/saveCancelControl/saveCancelControl";
import {groupsDataProps} from "./schemas";

export function Group() {
    const token = useToken()
    const [state, dispatch] = useReducer(groupReducer as any, groupStateInit) as [typeof groupStateInit, React.Dispatch<groupActionType>]
    const controller = useRef<boolean>(false)
    const data = useMemo(() => {
        return dealGroupData(state as typeof groupStateInit)
    }, [state])
    console.log(state)
    console.log(data)

    const saveRawData = useCallback(async (token: string) => {
        const fetchData = await fetchGroup(token)
        const saveData = []
        for (let datum of Object.values(fetchData) as any) {
            let dataDict = {} as any
            dataDict.groupName = Object.keys(datum)[0]
            dataDict.groupData = Object.values(datum)[0]
            dataDict.updateTime = "2021-12-27 10:57:42"
            saveData.push(dataDict)
        }
        if (controller.current) {
            dispatch({
                type: "settingGeneral.setRawData",
                payload: saveData
            })
        }
    }, [])

     useEffect(()=>{
        controller.current = true
        console.log(saveRawData(token))
        return ()=>{
            controller.current = false
        }
    },[saveRawData, token])

    return (
        <div className={"group"}>
            <SettingTitle config={groupTitleConfig} state={state} dispatch={dispatch} data={data}/>
            <SortModule config={groupSortConfig} state={state as typeof sortInit} dispatch={dispatch}/>
            <GroupsData data={data} state={state} dispatch={dispatch}/>
            <SaveCancelControl state={state} dispatch={dispatch}
                               saveFunction={()=>{}} cancelFunction={()=>{}}/>
        </div>
    )
}

function GroupsData({data, state, dispatch}: groupsDataProps){
    return null
}