import React from "react";
import {TextLanguage} from "../../component/textComponent";

export function ResetButton({resetFunction}: {resetFunction: Function}){
    return (
        <button className={"secondary_button reset"} onClick={()=>{resetFunction()}}>
                <TextLanguage textId={"button.reset"}/>
        </button>
    )
}