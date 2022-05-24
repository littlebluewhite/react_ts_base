import {dataModuleProps, dataElementProps, clickMode, createFolderProps, dataRowProps, rowPhotoProps} from "./schemas"
import './dataModule.css'
import "./dataModule.css"
import {settingMode} from "../../generalReducer/settingGeneral";
import {TextLanguage} from "../../component/textComponent";
import React, {FormEvent, useCallback, useEffect, useRef, useState} from "react";
import {useToken} from "../../generalFunction/providerHook";
import {fetchCreateFolder, fetchPluginsSchemas} from "../../component/layout/accountSettingIndex/plugins/fetchFunction";
import {allSelectData, getSelectTextId} from "../selectModule/mergeSelect";


// reducer use settingGeneral
export function DataModule({data, state, dispatch, config}: dataModuleProps){
    return (
        <div className={"dataModule"}>
            {state.settingMode === settingMode.createFolder &&
                <CreateFolder state={state} dispatch={dispatch}/>}
            {data.length === 0 ?
                <div className={"noDataContainer"}>
                    <TextLanguage textId={config.noDataTextId}/>
                </div>: <DataRow data={data} config={config} state={state} dispatch={dispatch}/>}
        </div>
    )
}

export function CreateFolder({state, dispatch}: createFolderProps){
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
    const handleCheck = useCallback((item: any, check: { [key: string]: string }) => {
        let payload = {...check}
        switch (config.clickMode) {
            case clickMode.close:
            case clickMode.switch:
                break
            case clickMode.multiple:
                if (item[config.checkKey as string] in payload) {
                    delete payload[item[config.checkKey as string]]
                } else {
                    payload[item[config.checkKey as string]] = item
                }
                break
            case clickMode.single:
                if (item[config.checkKey as string] in payload) {
                    payload = {}
                } else {
                    payload = {[item[config.checkKey as string]]: item}
                }
                break
        }
        dispatch({
            type: "settingGeneral.setCheck",
            payload: payload
        })
    }, [config, dispatch])

    return (
        <>
            {data.map((item: any, index: number) => (
                <div className={"dataRow" + (item[config.checkKey as string] in state.check ? " active" : "")}
                     onClick={() => handleCheck(item, state.check)} key={index}>
                    {config.clickMode === clickMode.single &&
                        <div className={"clickMode"} style={{width: "2.5%"}}>
                            <input type="radio" checked={item[config.checkKey as string] in state.check}
                                   readOnly={true}/>
                        </div>
                    }
                    {config.rowPhoto && <RowPhoto item={item} rowPhoto={config.rowPhoto}/>}
                    {
                        Object.keys(config.row).map((field: string, index: number) => (
                            <DataElement key={index} field={field} value={item[field]} config={config.row[field]}/>
                        ))
                    }
                </div>
            ))}
        </>
    )
}

function RowPhoto({item, rowPhoto}: rowPhotoProps) {
    const [isHover, setIsHover] = useState<boolean>(false)

    const photoClassName = `${rowPhoto.field}-${item[rowPhoto.field]}`

    const hoverTextId = rowPhoto.item?
        (rowPhoto.item[photoClassName]?rowPhoto.item[photoClassName]["hoverTextId"]: undefined) : undefined

    async function handleClick(event: React.MouseEvent<HTMLDivElement>) {
        try{
            const _a = rowPhoto.item? rowPhoto.item[photoClassName]: void 0
            const clickFunc = _a === null || _a === void 0 ? void 0: _a.clickFunc
            if (clickFunc){
                event.stopPropagation()
                await clickFunc(item)
            }
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={`svgContainer ${photoClassName}`}
             style={{width: "2.5%"}} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
             onClick={(event)=>handleClick(event)}>
            {isHover && hoverTextId &&
                <div className={"hoverText"}>
                    <TextLanguage textId={hoverTextId}/>
                </div>}
        </div>
    )
}

export function DataElement({field, value, config}: dataElementProps){
    return (
        <div className={"dataElement"} style={{width: config.width}}>
            <div className={"block"} style={{width: "0.8rem"}}/>
            {config.photo && <div className={`svgContainer ${field}-${value}`}/>}
            {field in allSelectData ? <TextLanguage textId={getSelectTextId(field, value)}/>:
            value}
        </div>
    )
}