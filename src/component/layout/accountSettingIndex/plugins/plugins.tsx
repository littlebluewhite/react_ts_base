import React, {FormEvent, useCallback, useEffect, useMemo, useReducer, useRef} from "react";
import {pluginsActionType, pluginsReducer, pluginsStateInit} from "./pluginsReducer";
import {SettingTitle} from "../../../../Module/settingTitle/settingTitle";
import {pluginsDataConfig, pluginsFilterConfig, pluginsSortConfig, pluginsTitleConfig} from "./moduleConfig";
import {FilterModule} from "../../../../Module/selectModule/selectModule";
import "./plugins.css"
import {ResetButton} from "../../../../Module/resetButton/resetButton";
import {fetchCreateFolder, fetchPluginsSchemas} from "./fetchFunction";
import {useLang, useToken} from "../../../../generalFunction/providerHook";
import {dealPluginsData} from "./pluginsFunction";
import {createFolderProps, dataRowProps, dataModuleProps, pluginsLayersProps, dataElementProps} from "./schemas";
import {settingMode} from "../../../../generalReducer/settingGeneral";
import {SortModule} from "../../../../Module/sortModule/sortModule";
import {TextLanguage} from "../../../textComponent";
import {clickMode} from "../../../../Module/dataModule/schemas";
import {allSelectData, getSelectTextId} from "../../../../Module/selectModule/mergeSelect";

export function Plugins() {
    const [state, dispatch] = useReducer(pluginsReducer as any, pluginsStateInit) as [typeof pluginsStateInit, React.Dispatch<pluginsActionType>]
    const controller = useRef<Boolean>(false)
    const token = useToken()
    const langPackage = useLang().langPackage
    const data = useMemo(() => {
        const listData = []
        let targetDict = state.rawData as {[key: string]: any}
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

    console.log("data: ", data)
    console.log(state)

    const saveRawData = useCallback(async (token: string) => {
        try{
            const fetchData = await fetchPluginsSchemas(token)
            if (controller.current){
                dispatch({
                    type: "settingGeneral.setRawData",
                    payload: fetchData
                })
            }
        }catch (e) {
            console.log(e)
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
        <div className={"pluginsStructure"}>
            <SettingTitle config={pluginsTitleConfig} state={state} dispatch={dispatch} data={data}/>
            <div className={"filterContainer"}>
                <FilterModule dispatch={dispatch} state={state} config={pluginsFilterConfig}/>
                <ResetButton resetFunction={resetFunction}/>
            </div>
            <PluginsLayers dispatch={dispatch} state={state}/>
            <SortModule config={pluginsSortConfig} state={state} dispatch={dispatch}/>
            <DataModule data={data.dealData} state={state} dispatch={dispatch} config={pluginsDataConfig}/>
        </div>
    )
}

function PluginsLayers({dispatch, state}: pluginsLayersProps){
    const changeLayer = useCallback((layers: string[], item: string = "") => {
        let newLayers = [] as string[]
        if (layers.includes(item)) {
            newLayers = layers.slice(0, layers.indexOf(item) + 1)
        }
        dispatch({
            type: "setLayers",
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

function DataModule({data, state, dispatch, config}: dataModuleProps){
    return (
        <div className={"dataModule"}>
            {state.settingMode === settingMode.createFolder && config.createFolder &&
                <CreateFolder state={state} dispatch={dispatch}/>}
            {data.length === 0 ?
                <div className={"noDataContainer"}>
                    <TextLanguage textId={config.noDataTextId}/>
                </div>: <DataRow data={data} config={config} state={state} dispatch={dispatch}/>}
        </div>
    )
}

function CreateFolder({state, dispatch}: createFolderProps){
    const inputRef = useRef<HTMLInputElement|null>(null)
    const token = useToken()
    function handleCancel(){
        dispatch({
            type: "settingGeneral.setStatus",
            payload: settingMode.watch
        })
    }

    const handleCreateFolder = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try{
            console.log(await fetchCreateFolder(inputRef.current?.value, state.layers, token))
            const data = await fetchPluginsSchemas(token)
            dispatch({
                type: "settingGeneral.setRawData",
                payload: data
            })
            dispatch({
                type: "settingGeneral.setStatus",
                payload: settingMode.watch
            })
        }catch (e: any) {
            console.log(e)
            alert(Object.values(await e.json())[0])
        }
    },[token, state.layers, dispatch])

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    return (
        <div className={"createFolder"}>
            <form onSubmit={(event)=>handleCreateFolder(event)}>
                <div className={"firstLine"}>
                    <div className={"leftContainer"}>
                        <div className={"svgContainer folder2"}/>
                        <input className={"input"} type="text" required={true} ref={inputRef}/>
                    </div>
                    <div className={"rightContainer"}>
                        <button className={"secondary_button save"}>
                            <TextLanguage textId={"button.save"}/>
                        </button>
                        <button className={"secondary_button hasMargin"} onClick={()=>handleCancel()}>
                            <TextLanguage textId={"button.cancel"}/>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

function DataRow({data, config, state, dispatch}: dataRowProps){
    const handleCheck = useCallback((item: any, check:{ [key: string]: string})=>{
        let payload = {...check}
        switch (config.clickMode){
            case clickMode.close:
            case clickMode.switch:
                break
            case clickMode.multiple:
                if (JSON.stringify(item) in payload){
                    delete payload[JSON.stringify(item)]
                }else{
                    payload[JSON.stringify(item)] = ""
                }
                break
            case clickMode.single:
                if (JSON.stringify(item) in payload){
                    payload = {}
                }else{
                    payload = {[JSON.stringify(item)]: ""}
                }
                break
        }
        dispatch({
            type: "settingGeneral.setCheck",
            payload: payload
        })
    },[config, dispatch])

    return (
        <>
            {data.map((item: any, index: number)=>(
                <div className={"dataRow"} onClick={()=>handleCheck(item, state.check)} key={index}>
                    {config.clickMode === clickMode.single &&
                        <div className={"clickMode"} style={{width: "2.5%"}}>
                            <input type="radio" checked={JSON.stringify(item) in state.check} readOnly={true}/>
                        </div>
                    }
                    { config.rowPhoto &&
                        <div className={`svgContainer ${config.rowPhoto}-${item[config.rowPhoto]}`} style={{width: "2.5%"}}></div>
                    }
                    {
                        Object.keys(config.row).map((field: string, index: number) =>(
                            <DataElement key={index} field={field} value={item[field]} config={config.row[field]}/>
                        ))
                    }
                </div>
            ))}
        </>
    )
}

function DataElement({field, value, config}: dataElementProps){
    return (
        <div className={"dataElement"} style={{width: config.width}}>
            <div className={"block"} style={{width: "0.8rem"}}/>
            {config.photo && <div className={`svgContainer ${field}-${value}`}/>}
            {field in allSelectData ? <TextLanguage textId={getSelectTextId(field, value)}/>:
            value}
        </div>
    )
}