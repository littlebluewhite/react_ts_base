import {optionType, FilterModuleType, selectMode, selectConfig, defaultConfig} from "./schemas";
import "./selectModule.css";
import { TextLanguage } from "../../component/textComponent";
import {useLang} from "../../generalFunction/providerHook";
import React, {ChangeEvent, useCallback, useEffect, useRef, useState} from "react";
import {allSelectData} from "./mergeSelect";

// reducer use filterReducer when using for filter
export function SelectModule(
    {value, dispatch, config, additionalFunc=()=>{}, effectFunc=()=>{}}: FilterModuleType){
    const controller = useRef<boolean>(false)
    const configDataInit = function(){
        if(typeof(config) === "function"){
            return defaultConfig
        }else{
            return config as selectConfig
        }
    }()
    const [configData, setConfigData] = useState<selectConfig>(configDataInit)

    function changeSelect(event: ChangeEvent<HTMLSelectElement>){
        additionalFunc(event)
        if(configData.mode === selectMode.filter && dispatch){
            dispatch({
                type: "filter.setFilter",
                payload: {
                    field: configData.name.slice(0, -7),
                    condition: event.target.value,
                }
            })
        }
    }

    const fetchData = useCallback(async ()=>{
        if(typeof(config) === 'function'){
            const data = await config()
            allSelectData[data.name] = data
            setConfigData(data)
            effectFunc()
        }
    },[config, effectFunc])
    useEffect(()=>{
        controller.current = true
        if( controller.current){
            console.log(fetchData())
        }
        return ()=>{
            controller.current = false
        }
    },[fetchData])

    return(
         <div className={`selectModule ${configData.name}-${configData.mode}`}>
            <label htmlFor={`${configData.name}-${configData.mode}`}>
                <TextLanguage textId={configData.textId}/>
            </label>
            <select id={`${configData.name}-${configData.mode}`} className={`selectFilter ${configData.name}-${configData.mode}`}
                    onChange={(event) => {changeSelect(event)}}
                    // value={state.filter[config.name]}
                    value={value}
            >
                {configData.option.map((item, index) => (
                    <OptionAuto option={item} key={index}/>))}
            </select>
        </div>)
}

function OptionAuto({option}: {option: optionType}){
    const text = useLang().langPackage[option.textId] || option.textId
    return(
        <>
            <option value={option.value}>
                {text}
            </option>
        </>
    )
}
