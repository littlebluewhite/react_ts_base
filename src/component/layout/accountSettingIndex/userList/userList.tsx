import {SettingTitle} from "../../../../Module/settingTitle/settingTitle";
import {userListDataConfig, userListSortConfig, userListTitleConfig} from "./moduleConfig";
import "./userList.css"
import React, {useCallback, useEffect, useMemo, useReducer, useRef} from "react";
import {userListActionType, userListReducer, userListStateInit} from "./userListReducer";
import {SelectModule} from "../../../../Module/selectModule/selectModule";
import {accessLevelSelect} from "../../../../Module/selectModule/configLibrary";
import {settingTitleDispatch, settingTitleState} from "../../../../Module/settingTitle/schemas";
import {ResetButton} from "../../../../Module/resetButton/resetButton";
import {SortModule} from "../../../../Module/sortModule/sortModule";
import {DataModule} from "../../../../Module/dataModule/dataModule";
import {useLang, useToken} from "../../../../generalFunction/providerHook";
import {selectMode} from "../../../../Module/selectModule/schemas";
import {fetchDeleteAccount, fetchUserList} from "./fetchFunction";
import {dealUserListData} from "./fuction";
import update from "immutability-helper";


export function UserList() {
    const controller = useRef<boolean>(false)
    const [state, dispatch] = useReducer(userListReducer as any, userListStateInit) as [typeof userListStateInit, React.Dispatch<userListActionType>]
    const token = useToken()
    const langPackage = useLang().langPackage
    const data = useMemo(()=>{
        return dealUserListData(state, state.rawData, langPackage)
    },[state, langPackage])
    const selectModuleConfig = async ()=>{
        return await accessLevelSelect(token, selectMode.filter)
    }

    function handleReset(){
        dispatch({
            type: "settingGeneral.setSearch",
            payload: ""
        })
        dispatch({
            type: "filter.filterReset",
            payload: ""
        })
    }

    const saveRawData = useCallback(async (token: string)=>{
        try{
            const fetchData = await fetchUserList(token)
            if (controller.current) {
                dispatch({
                    type: "settingGeneral.setRawData",
                    payload: fetchData
                })
            }
        } catch (e) {
            console.log(e)
        }
    }, [])

    function filterModuleAdditionalFunc() {
        dispatch({
            type: "settingGeneral.setCheck",
            payload: {}
        })
    }

    async function deleteFunc1(){
        console.log(await fetchDeleteAccount(token, Object.keys(state.check)[0]))
    }

     async function deleteFunc2() {
        console.log(await saveRawData(token))
        dispatch({
            type: "settingGeneral.setCheck",
            payload: {}
        })
    }

    const titleConfig = update(userListTitleConfig, {
        delete:{popupDeleteConfig: {page1: {func: {$set: deleteFunc1}}, page2: {func: {$set: deleteFunc2}}}}
    })

    useEffect(() => {
        controller.current = true
        console.log(saveRawData(token))
        return () => {
            controller.current = false
        }
    }, [saveRawData, token])

    return (
        <div className={"userList"}>
            <SettingTitle config={titleConfig} state={state as settingTitleState} dispatch={dispatch as settingTitleDispatch} data={data}/>
            <div className={"filterContainer"}>
                <SelectModule dispatch={dispatch} value={state.filter.accessLevel} config={selectModuleConfig}
                additionalFunc={filterModuleAdditionalFunc}/>
                <ResetButton resetFunction={()=>handleReset()}/>
            </div>
            <SortModule config={userListSortConfig} state={state} dispatch={dispatch}/>
            <DataModule config={userListDataConfig} data={data.dealData} state={state} dispatch={dispatch}/>
        </div>
    )
}