import React, {useCallback, useEffect, useMemo, useReducer, useRef} from "react";
import {pluginsActionType, pluginsReducer, pluginsStateInit} from "./pluginsReducer";
import {SettingTitle} from "../../../../Module/settingTitle/settingTitle";
import {pluginsDataConfig, pluginsFilterConfig, pluginsSortConfig, pluginsTitleConfig} from "./moduleConfig";
import {FilterModule} from "../../../../Module/selectModule/selectModule";
import "./plugins.css"
import {ResetButton} from "../../../../Module/resetButton/resetButton";
import {fetchDeletePlugins, fetchPluginsSchemas} from "./fetchFunction";
import {useLang, useToken} from "../../../../generalFunction/providerHook";
import {dealPluginsData} from "./pluginsFunction";
import {pluginsLayersProps} from "./schemas";
import {settingMode} from "../../../../generalReducer/settingGeneral";
import {SortModule} from "../../../../Module/sortModule/sortModule";
import {DataModule} from "../../../../Module/dataModule/dataModule";
import update from "immutability-helper";

export function Plugins() {
    const [state, dispatch] = useReducer(pluginsReducer as any, pluginsStateInit) as [typeof pluginsStateInit, React.Dispatch<pluginsActionType>]
    const controller = useRef<Boolean>(false)
    const token = useToken()
    const langPackage = useLang().langPackage
    const data = useMemo(() => {
        const listData = []
        let targetDict = state.rawData as { [key: string]: any }
        for (let layer of state.layers) {
            targetDict = targetDict[layer]
        }
        for (let pluginsSchemasName of Object.keys(targetDict)) {
            let fileType = 0
            if (pluginsSchemasName.slice(-3) === "csv") {
                fileType = 1
            }
            listData.push({
                "pluginsSchemasName": pluginsSchemasName,
                "fileType": fileType,
                "schemas": targetDict[pluginsSchemasName]
            })
        }
        return dealPluginsData(state, listData, langPackage)
    }, [state, langPackage])

    function resetFunction() {
        dispatch({
            type: "settingGeneral.setSearch",
            payload: ""
        })
        dispatch({
            type: "filter.filterReset",
            payload: ""
        })
    }

    // console.log("data: ", data)
    // console.log(state)

    const saveRawData = useCallback(async (token: string) => {
        try {
            const fetchData = await fetchPluginsSchemas(token)
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

    useEffect(() => {
        controller.current = true
        console.log(saveRawData(token))
        return () => {
            controller.current = false
        }
    }, [saveRawData, token])

    async function deleteFunc1() {
        console.log(await fetchDeletePlugins(token, state))
    }

    async function deleteFunc2() {
        console.log(await saveRawData(token))
        dispatch({
            type: "settingGeneral.setCheck",
            payload: {}
        })
    }

    function filterModuleAdditionalFunc() {
        dispatch({
            type: "settingGeneral.setCheck",
            payload: {}
        })
    }

    const clickFunction = (item: any)=>{
        const newLayers = [...state.layers, item.pluginsSchemasName]
        dispatch({
            type: "settingGeneral.setLayers",
            payload: newLayers
        })
        dispatch({
            type: "settingGeneral.setStatus",
            payload: settingMode.watch
        })
        dispatch({
            type: "settingGeneral.setCheck",
            payload: {}
        })
    }
    const dataConfig = update(pluginsDataConfig, {rowPhoto: {item: {"fileType-0": {clickFunc: {$set: clickFunction}}}}})
    const titleConfig = update(pluginsTitleConfig,
        {delete: {popupDeleteConfig: {page1: {func: {$set: deleteFunc1}}, page2: {func: {$set: deleteFunc2}}}}})

    return (
        <div className={"pluginsStructure"}>
            <SettingTitle config={titleConfig} state={state} dispatch={dispatch} data={data}
            />
            <div className={"filterContainer"}>
                <FilterModule dispatch={dispatch} state={state} config={pluginsFilterConfig}
                              additionalFunc={filterModuleAdditionalFunc}
                />
                <ResetButton resetFunction={resetFunction}/>
            </div>
            <PluginsLayers dispatch={dispatch} state={state}/>
            <SortModule config={pluginsSortConfig} state={state} dispatch={dispatch}/>
            <DataModule data={data.dealData} state={state} dispatch={dispatch} config={dataConfig}/>
        </div>
    )
}

function PluginsLayers({dispatch, state}: pluginsLayersProps) {
    const changeLayer = useCallback((layers: string[], item: string = "") => {
        let newLayers = [] as string[]
        if (layers.includes(item)) {
            newLayers = layers.slice(0, layers.indexOf(item) + 1)
        }
        dispatch({
            type: "settingGeneral.setLayers",
            payload: newLayers
        })
        dispatch({
            type: "settingGeneral.setStatus",
            payload: settingMode.watch
        })
    }, [dispatch])
    return (
        <div className={"pluginsLayers"}>
            <div className={"svgContainer folder"}/>
            <span className={"slash"}>
                /
            </span>
            <span className={"link"} onClick={() => changeLayer(state.layers)}>Function_Plugins</span>
            {state.layers.map((item, index) => (
                <span key={index} className={"link"} onClick={() => changeLayer(state.layers, item)}>
                    <span className={"slash"}>/</span>{item}
                </span>
            ))}
            <span className={"slash"}>
                /
            </span>
        </div>
    )
}