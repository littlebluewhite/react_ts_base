import "./pluginsEdit.css"
import {Link, useLocation, useNavigate} from "react-router-dom";
import {pluginsStateInit} from "../pluginsReducer";
import {pluginsUpdateReducer, pluginsUpdateStateInit} from "./reducer";
import React, {FormEvent, useCallback, useReducer} from "react";
import {useToken} from "../../../../../generalFunction/providerHook";
import update from "immutability-helper";
import {fetchUpdatePlugins} from "./fetchFunction";
import {usePopupWindow3} from "../../../../../Module/popupWindow/popupWindow";
import {TextLanguage} from "../../../../textComponent";
import {deepCopy} from "../../../../../generalFunction/copyFunction";
import {pluginsButtonProps, pluginsSchemasProps, updateDataType} from "./schemas";
import {popupSaveConfig} from "../create/moduleConfig";

export function PluginsEditor() {
    const locationState = useLocation().state as typeof pluginsStateInit
    const navigate = useNavigate()
    const filename = Object.keys(locationState.check)[0]
    const fileSchemas = Object.values(locationState.check)[0]?.schemas

    const newLocationState = update(locationState, {check: {$set: {}}})
    const saveConfig = update(popupSaveConfig, {
        page1: {
            func: {
                $set: async () => {
                    console.log(await fetchUpdatePlugins(token, locationState.layers, filename, state.updateData))
                }
            }
        }, page2: {
            func: {
                $set: () => {
                    navigate("/layout/accountSetting/plugins", {state: newLocationState})
                }
            }
        }
    })

    const [saveComponent, setIsOpen] = usePopupWindow3(saveConfig)
    const reducerStateInit = {
        updateData: fileSchemas
    } as typeof pluginsUpdateStateInit
    const [state, dispatch] = useReducer(pluginsUpdateReducer, reducerStateInit)
    const token = useToken()

    const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsOpen(true)
    }, [setIsOpen])

    function handleReset() {
        dispatch({
            type: "setUpdateData",
            payload: fileSchemas
        })
    }

    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <div className={"pluginsSchemasName"}>
                {saveComponent}
                <div className={"title"}>
                    <TextLanguage textId={"accountSetting.plugins.editPlugins"}/>
                </div>
                <div className={"secondary_button"} onClick={() => handleReset()}>
                    <TextLanguage textId={"button.reset"}/>
                </div>
            </div>
            <div className={"pluginsNameContainer"}>
                <div className={"pluginsName"}>
                    <TextLanguage textId={"accountSetting.plugins.pluginsName"}/>
                </div>
                <div className={"value"}>
                    {filename}
                </div>
            </div>
            <PluginsSchemas state={state} dispatch={dispatch}/>
            <PluginsButton locationState={locationState}/>
        </form>
    )
}

function PluginsSchemas({state, dispatch}: pluginsSchemasProps) {
    const handleDelete = useCallback((index: number, updateData: updateDataType[]) => {
        let result = deepCopy(updateData)
        result.splice(index, 1)
        dispatch({
            type: "setUpdateData",
            payload: result
        })
    }, [dispatch])

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>,
                                      index: number, key: keyof updateDataType, updateData: updateDataType[]) => {
        let result = deepCopy(updateData)
        result[index][key] = event.target.value
        dispatch({
            type: "setUpdateData",
            payload: result
        })
    }, [dispatch])

    const handleAdd = useCallback((updateData: updateDataType[]) => {
        const result = update(updateData, {$push: [{"Name": "", "Condition": ""}]})
        dispatch({
            type: "setUpdateData",
            payload: result
        })
    }, [dispatch])

    return (
        <div className={"pluginsSchemas"}>
            {state.updateData.map((item: { Name: string, Condition: string }, index) => (
                <div key={index} className={"schemasRow"}>
                    <div className={"svgContainer"} onClick={() => handleDelete(index, state.updateData)}>
                        <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 0C5.3715 0 0 5.373 0 12C0 18.627 5.3715 24 12 24C18.6285 24 24 18.627 24 12C24 5.373 18.6285 0 12 0ZM17.5605 15.4395C17.8418 15.7208 17.9998 16.1022 17.9998 16.5C17.9998 16.8978 17.8418 17.2792 17.5605 17.5605C17.2792 17.8418 16.8978 17.9998 16.5 17.9998C16.1022 17.9998 15.7208 17.8418 15.4395 17.5605L12 14.121L8.5605 17.5605C8.42152 17.7003 8.25628 17.8112 8.07428 17.8869C7.89228 17.9626 7.69711 18.0016 7.5 18.0016C7.30289 18.0016 7.10772 17.9626 6.92572 17.8869C6.74372 17.8112 6.57848 17.7003 6.4395 17.5605C6.30008 17.4213 6.18948 17.256 6.11401 17.074C6.03854 16.8921 5.9997 16.697 5.9997 16.5C5.9997 16.303 6.03854 16.1079 6.11401 15.926C6.18948 15.744 6.30008 15.5787 6.4395 15.4395L9.879 12L6.4395 8.5605C6.15824 8.27924 6.00023 7.89776 6.00023 7.5C6.00023 7.10224 6.15824 6.72076 6.4395 6.4395C6.72076 6.15824 7.10224 6.00023 7.5 6.00023C7.89776 6.00023 8.27924 6.15824 8.5605 6.4395L12 9.879L15.4395 6.4395C15.7208 6.15824 16.1022 6.00023 16.5 6.00023C16.8978 6.00023 17.2792 6.15824 17.5605 6.4395C17.8418 6.72076 17.9998 7.10224 17.9998 7.5C17.9998 7.89776 17.8418 8.27924 17.5605 8.5605L14.121 12L17.5605 15.4395Z"
                                fill="#EC0000"/>
                        </svg>
                    </div>
                    <div className={"column1"}>
                        <input type="text" value={item.Name} required={true}
                               placeholder={"Description of this plugin’s authority detail"}
                               onChange={(event) =>
                                   handleChange(event, index, "Name", state.updateData)}/>
                    </div>
                    <div className={"column2"}>
                        <input type="text" value={item.Condition} required={true}
                               placeholder={"Condition"}
                               onChange={(event) =>
                                   handleChange(event, index, "Condition", state.updateData)}/>
                    </div>
                </div>
            ))}
            <div className={"addButtonContainer"}>
                <div className={"addButton"} onClick={() => handleAdd(state.updateData)}>
                    ✚
                </div>
            </div>
        </div>
    )
}

function PluginsButton({locationState}: pluginsButtonProps) {
    return (
        <div className={"pluginsButton"}>
            <Link to={"/layout/accountSetting/plugins"} state={locationState}>
                <div className={"secondary_button"}>
                    <TextLanguage textId={"button.cancel"}/>
                </div>
            </Link>
            <button className={"secondary_button save"}>
                <TextLanguage textId={"button.save"}/>
            </button>
        </div>
    )
}