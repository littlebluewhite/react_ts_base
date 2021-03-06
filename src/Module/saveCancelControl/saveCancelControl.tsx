import {TextLanguage} from "../../component/textComponent";
import "./saveCancelControl.css"
import React from "react";
import {saveCancelControlProps} from "./schemas";
import {settingMode} from "../../generalReducer/settingGeneral";
import {usePopupWindow1, usePopupWindow2} from "../popupWindow/popupWindow";
import {cancelConfig, saveConfig2} from "../popupWindow/exampleConfig";
import update from "immutability-helper";

// reducer use settingGeneral
export function SaveCancelControl({state, dispatch, config}: saveCancelControlProps) {
    const popupCancelConfig = update(cancelConfig, {
        page1: {
            func: {
                $set: async () => {
                    if(config.cancelFunction){
                        await config.cancelFunction()
                    }
                    dispatch({
                        type: "settingGeneral.setStatus",
                        payload: settingMode.watch
                    })
                    dispatch({
                        type: "settingGeneral.setIsChange",
                        payload: false
                    })
                }
            }
        }
    })

    const popupSaveConfig = update(saveConfig2, {
            page2: {
                func: {
                    $set: async () => {
                        if (config.continueFunction){
                            await config.continueFunction()
                        }
                        dispatch({
                            type: "settingGeneral.setStatus",
                            payload: settingMode.watch
                        })
                        dispatch({
                            type: "settingGeneral.setIsChange",
                            payload: false
                        })
                    }
                }
            }
        }
    )

    const [popCancel, setCancelOpen] = usePopupWindow1(popupCancelConfig)
    const [popSave, setSaveOpen] = usePopupWindow2(popupSaveConfig)

    async function handleCancel() {
        if (state.isChange) {
            setCancelOpen(true)
        } else {
            dispatch({
                type: "settingGeneral.setStatus",
                payload: settingMode.watch
            })
        }
    }

    async function handleSave() {
        if(config.saveFunction){
            await config.saveFunction()
        }
        setSaveOpen(true)
    }

    return (
        <>
            {popCancel}
            {popSave}
            {state.settingMode === settingMode.edit &&
                <div className={"saveCancelControl"}>
                    <div className={"buttonContainer"}>
                        <button className={"secondary_button save"} disabled={!state.isChange}
                                onClick={() => handleSave()}
                        >
                            <TextLanguage textId={"button.save"}/>
                        </button>
                        <button className={"secondary_button"} onClick={() => handleCancel()}>
                            <TextLanguage textId={"button.cancel"}/>
                        </button>
                    </div>
                </div>
            }
        </>
    )
}