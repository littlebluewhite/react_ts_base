import {optionType, selectModuleType} from "./schemas";
import "./selectModule.css";
import { TextLanguage } from "../../component/textComponent";
import {useLang} from "../../function/generalHook/providerHook";

export function SelectModule({changeSelect, data, value}: selectModuleType){
    return(
         <div className={"selectContainer " + data.id}>
            <label htmlFor={data.id}>
                <TextLanguage textId={data.textId}/>
            </label>
            <select id={data.id} className={"selectFilter "+data.id}
                    onChange={(event) => {changeSelect(event)}}
                    value={value}
            >
                {data.option.map((item, index) => (
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


