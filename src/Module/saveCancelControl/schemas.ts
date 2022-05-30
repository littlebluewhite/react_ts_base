import {settingGeneralActionType, settingGeneralInit} from "../../generalReducer/settingGeneral";
import React from "react";

export interface saveCancelControlProps {
    state: typeof settingGeneralInit
    dispatch: React.Dispatch<settingGeneralActionType>
    config: saveCancelConfigType
}

export interface saveCancelConfigType{
    saveFunction?: Function
    continueFunction?: Function
    cancelFunction?: Function
}