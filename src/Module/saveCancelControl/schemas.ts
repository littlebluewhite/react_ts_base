import {settingGeneralActionType, settingGeneralInit} from "../../generalReducer/settingGeneral";
import React from "react";

export interface saveCancelControlProps {
    state: typeof settingGeneralInit
    dispatch: React.Dispatch<settingGeneralActionType>
    saveFunction: Function
    cancelFunction: Function
}