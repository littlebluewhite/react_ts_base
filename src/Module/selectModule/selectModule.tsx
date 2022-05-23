import {optionType, FilterModuleType} from "./schemas";
import "./selectModule.css";
import { TextLanguage } from "../../component/textComponent";
import {useLang} from "../../generalFunction/providerHook";
import React, {ChangeEvent} from "react";

// reducer use filterReducer
export function FilterModule({state, dispatch, config}: FilterModuleType){
    function changeSelect(event: ChangeEvent<HTMLSelectElement>){
        dispatch({
            type: "filter.setFilter",
            payload: {
                field: config.name,
                condition: event.target.value,
            }
        })
    }
    return(
         <div className={"FilterModule " + config.id}>
            <label htmlFor={config.id}>
                <TextLanguage textId={config.textId}/>
            </label>
            <select id={config.id} className={"selectFilter "+config.id}
                    onChange={(event) => {changeSelect(event)}}
                    value={state.filter[config.name]}
            >
                {config.option.map((item, index) => (
                    <OptionAuto option={item} key={index}/>))}
            </select>
        </div>)
}

function OptionAuto({option}: {option: optionType}){
    const text = useLang().langPackage[option.textId]
    return(
        <>
            <option value={option.value}>
                {text}
            </option>
        </>
    )
}
