import React, {useCallback, useEffect, useMemo, useReducer, useRef, useState} from "react";
import {SettingTitle} from "../../../../Module/settingTitle/settingTitle";
import {groupActionType, groupReducer, groupStateInit} from "./groupReducer";
import {groupSortConfig, groupTitleConfig} from "./moduleConfig";
import "./group.css"
import {SortModule} from "../../../../Module/sortModule/sortModule";
import {sortInit} from "../../../../generalReducer/sortModule";
import {
    checkFetchResult,
    dealGroupData,
    deepCopy,
    fetchCreateGroup,
    handleMouse,
    mergeClassName,
    mergeSelectData,
    rangeArrayClassName,
    rangeArrayValue,
    rangeClassName,
    setDataReturn,
    subHandleClick,
    useFold
} from "./groupFunction";
import {deleteAccount, fetchGroup} from "./fetchFunction";
import {useToken} from "../../../../generalFunction/providerHook";
import {SaveCancelControl} from "../../../../Module/saveCancelControl/saveCancelControl";
import {
    createGroupFieldProps,
    groupCreateProps,
    groupElementContainerProps,
    groupFieldProps,
    groupsDataProps,
    handleAlarmAckProps,
    handleCreateAlarmAckProps,
    handleCreateGroupDataProps,
    handleCreateObjectProps,
    handleGroupDataProps,
    handleMergeAlarmAckProps,
    handleMergeDataProps,
    handleMergeObjectProps,
    handleObjectProps,
    mergeDataProps,
    mergeGroupFieldProps,
    mergeGroupProps,
    mergeGroupSelectProps
} from "./schemas";
import {settingTitleDispatch, settingTitleState} from "../../../../Module/settingTitle/schemas";
import {TextLanguage} from "../../../textComponent";
import {ParentModel} from "../../../parentComponent";
import {globalSetting} from "../../../../setting/globalSetting";
import {hoverData} from "./package";
import {settingMode} from "../../../../generalReducer/settingGeneral";
import {usePopupWindow1, usePopupWindow2} from "../../../../Module/popupWindow/popupWindow";
import {saveConfig2} from "../../../../Module/popupWindow/exampleConfig";
import update from "immutability-helper";

// const token
// const lang = "EN"
const ackSchemas = [
    "AlarmNeedAckNeedReset",
    "AlarmNeedAckNoReset",
    "AlarmNoAckNoReset",
    "Close"
]

export function Group() {
    const token = useToken()
    console.log(token);

    const [state, dispatch] = useReducer(groupReducer as any, groupStateInit) as [typeof groupStateInit, React.Dispatch<groupActionType>]

    const controller = useRef<boolean>(false)
    const data = useMemo(() => {
        return dealGroupData(state as typeof groupStateInit)
    }, [state])

    const saveRawData = useCallback(async (token: string) => {
        const fetchData = await fetchGroup(token)

        const saveData = []
        for (let datum of Object.values(fetchData) as any) {
            let dataDict = {} as any
            dataDict.groupName = Object.keys(datum)[0]
            dataDict.groupData = Object.values(datum)[0]
            // dataDict.updateTime = "2021-12-27 10:57:42"
            saveData.push(dataDict)
        }
        if (controller.current) {
            dispatch({
                type: "settingGeneral.setRawData",
                payload: saveData
            })
        }
    }, [])

    useEffect(() => {
        controller.current = true
        console.log(saveRawData(token))
        return () => {
            controller.current = false
        }
    }, [saveRawData, token])

    return (
        <div className={"group"}>
            <SettingTitle config={groupTitleConfig} state={state as settingTitleState}
                          dispatch={dispatch as settingTitleDispatch} data={data}/>
            <SortModule config={groupSortConfig} state={state as typeof sortInit} dispatch={dispatch}/>
            <GroupsData data={data} state={state} dispatch={dispatch} saveRawData={saveRawData}/>
            <SaveCancelControl state={state} dispatch={dispatch}
                               saveFunction={() => {
                                   saveRawData(token)
                               }} cancelFunction={() => {
            }}/>
        </div>
    )
}

function GroupsData({data, state, dispatch, saveRawData}: groupsDataProps) {
    const token = useToken()
    const [deleteItem, setDeleteItem] = useState<string>()
    const cancelParams = {
        'page1': {
            'title': 'popupWindow.cancel1.title',
            'button1': 'popupWindow.cancel1.button1',
            'button2': 'popupWindow.cancel1.button2',
            func: async () => {
                await deleteAccount(token, deleteItem)
                await saveRawData(token)
                dispatch({
                    type: "settingGeneral.setStatus",
                    payload: settingMode.watch
                })
                dispatch({
                    type: "settingGeneral.setIsChange",
                    payload: false
                })
                // dispatch({
                //     type: "settingGeneral.setIsEdit",
                //     payload: false
                // })
            }
        }
    }
    const [component, setDelete] = usePopupWindow1(cancelParams)

    const handleDelete = useCallback(async (groupName: string) => {
        setDeleteItem(groupName)
        setDelete(true)

    }, [])
    return (
        <div className={"groupsData"}>
            {component}
            {state.settingMode === settingMode.create &&
                <GroupCreate state={state} dispatch={dispatch} saveRawData={saveRawData} handleDelete={handleDelete}/>}
            {data.map((item: any, index: number) => (
                <GroupElementContainer key={index} data={item} state={state} dispatch={dispatch}
                                       handleDelete={handleDelete} index={index}/>
            ))}
            <div className={"buttonBlock"}/>
        </div>
    )
}

function GroupCreate({state, dispatch, saveRawData, handleDelete}: groupCreateProps) {
    const token = useToken()
    const [isOpen, setIsOpen] = useState(false)
    // const [saveIsOpen, setSaveIsOpen] = useState(false)
    const saveParams = update(saveConfig2, {page2: {func: {
                $set:
                    async () => {
                        // saveFunction()
                        dispatch({
                            type: "settingGeneral.setStatus",
                            payload: settingMode.watch
                        })
                        dispatch({
                            type: "settingGeneral.setIsChange",
                            payload: false
                        })
                        // dispatch({
                        //     type: "settingGeneral.setIsCreate",
                        //     payload: false
                        // })
                    }
            }
        }
    })

    const [saveIsOpen, setSaveIsOpen] = usePopupWindow2(saveParams)
    const {isFold, foldClassName, changeFold} = useFold()
    const [createData, setCreateData] = useState({})
    const [mergeSelect, setMergeSelect] = useState({})
    const defaultDataRef = useRef({})
    const controller = useRef(false)
    const inputRef = useRef<any>()

    const fetchDefaultData = useCallback(async (token: string) => {
            const response = await fetch(`${globalSetting.SERVER}:${globalSetting.PORT}/api/account/default_template`, {
                headers: new Headers({
                    Authorization: "Bearer " + token
                })
            })
            const data = await response.json()
            if (controller.current) {
                defaultDataRef.current = deepCopy(data)
                setCreateData(data)
            }
        }, []
    )

    const handleSubmit = useCallback(async (event: any) => {
        event.preventDefault()
        try {
            const response = await fetchCreateGroup(token, createData, inputRef.current.value)
            const response2 = await checkFetchResult(response)
            setSaveIsOpen(true)
            saveRawData(token)
        } catch (e) {
            console.log(e)
        }
    }, [token, createData, setSaveIsOpen, saveRawData])

    function handleCancel() {
        dispatch({
            type: "settingGeneral.setStatus",
            payload: settingMode.watch
        })
        // dispatch({
        //     type: "settingGeneral.setIsCreate",
        //     payload: false
        // })
    }

    function openMerge() {
        setIsOpen(true)
    }

    useEffect(() => {
        controller.current = true
        fetchDefaultData(token)
    }, [fetchDefaultData, token])

    useEffect(() => {
        saveRawData(token)
    }, [saveRawData, token])

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    return (
        <div className={"groupCreate"}>
            {isOpen &&
                <MergeGroups setIsOpen={setIsOpen} rawData={state.rawData}
                             mergeSelect={mergeSelect} setCreateData={setCreateData}
                             setMergeSelect={setMergeSelect} defaultDataRef={defaultDataRef}
                />
            }
            {saveIsOpen}
            <form onSubmit={event => handleSubmit(event)}>
                <div className={"firstLine"}>
                    <div className={"leftContainer"}>
                        <input type="text" ref={inputRef} required={true}/>
                        <div className={"buttonContainer"} onClick={() => openMerge()}>
                            <svg width="2.125rem" height="1.25rem" viewBox="0 0 34 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M34 10.0024L24.3165 4.00066V8.00221H22.5095C21.497 7.99078 20.8024 7.7279 19.9207 7.15298C18.6135 6.30147 17.2371 4.6613 15.3711 3.07485C13.5257 1.49755 10.8664 -0.0226049 7.28956 0.000254601H0V4.00066H7.28956C10.1475 4.01209 11.6982 5.35394 13.7871 7.353C14.6804 8.21366 15.6172 9.1589 16.7655 10.0081C14.9764 11.3397 13.6743 12.8838 12.3005 14.0085C10.7844 15.2452 9.47848 15.979 7.287 15.9996H0.00128148V20H7.32801C12.1339 20 15.061 17.3483 17.091 15.3527C18.138 14.3297 19.0608 13.421 19.9233 12.8496C20.8011 12.2746 21.4996 12.0118 22.5069 12.0003H24.3165V15.9996L34 10.0001V10.0024Z"
                                    fill="#00EAFF"/>
                            </svg>
                        </div>
                        <div className={"foldButtonContainer"} onClick={() => changeFold()}>
                            <div className={foldClassName}/>
                        </div>
                    </div>
                    <div className={"rightContainer"}>
                        <button className={"secondary_button save"}>
                            <TextLanguage textId={"button.save"}/>
                        </button>
                        <button className={"secondary_button hasMargin"} onClick={() => handleCancel()}>
                            <TextLanguage textId={"button.cancel"}/>
                        </button>
                    </div>
                </div>
            </form>
            <div className={"groupFieldContainer"}>
                {!isFold && <HandleCreateGroupData data={createData}
                                                   layer={0}/>}
            </div>
        </div>
    )
}

function MergeGroups({
                         setIsOpen,
                         rawData,
                         mergeSelect,
                         setCreateData,
                         setMergeSelect,
                         defaultDataRef
                     }: mergeGroupProps) {
    const mergeData = useMemo(() => {
        const result = deepCopy(defaultDataRef.current)
        return mergeSelectData(result, mergeSelect)
    }, [defaultDataRef, mergeSelect])

    const handleSelect = useCallback((item: any) => {
        if (mergeSelect[item.groupName]) {
            setMergeSelect((pre: any) => {
                let result = {...pre}
                delete result[item.groupName]
                return result
            })
        } else {
            setMergeSelect((pre: any) => (
                {...pre, [item.groupName]: item.groupData}
            ))
        }
    }, [mergeSelect, setMergeSelect])

    const handleClose = useCallback(() => {
        setIsOpen(false)
    }, [setIsOpen])

    const handleMerge = useCallback(() => {
        setCreateData(mergeData)
        setIsOpen(false)
    }, [setCreateData, setIsOpen, mergeData])

    return (
        <ParentModel>
            <div className={"model"}>
                <div className={"setting"}>
                    <div className={"bar bar2"}>
                        <div className={"title"}>
                            <TextLanguage textId={"groupModule.group.bar.title"}/>
                        </div>
                        <div className={"information"}>
                            <TextLanguage textId={"groupModule.group.bar.information"}/>
                        </div>
                        <div className={"groupsContainer"}>
                            {rawData.map((item: any, index: number) => (
                                <MergeGroupSelect item={item} index={index}
                                                  mergeSelect={mergeSelect} setMergeSelect={setMergeSelect}
                                                  handleSelect={handleSelect} key={index}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={"articleContainer"}>
                        <div className={"mergeResult"}>
                            <div className={"title"}>
                                <TextLanguage textId={"groupModule.group.article.title"}/>
                            </div>
                            <div className={"subjectContainer"}>
                                <div className={"block"}/>
                                <div className={"subject s1"}>
                                    <TextLanguage textId={"off"}/>
                                </div>
                                <div className={"subject s2"}>
                                    <TextLanguage textId={"on"}/>
                                </div>
                                <div className={"subject s3"}>
                                    <TextLanguage textId={"groupModule.group.article.subject"}/>
                                </div>
                            </div>
                            <MergeData mergeSelect={mergeSelect}
                                       mergeData={mergeData}/>
                        </div>
                        <div className={"groupsEdit"}>
                            <div className={"buttonContainer"}>
                                <button className={"secondary_button merge"}
                                        disabled={Object.keys(mergeSelect).length === 0}
                                        onClick={() => handleMerge()}>
                                    <TextLanguage textId={"button.merge"}/>
                                </button>
                                <button className={"secondary_button"} onClick={() => handleClose()}>
                                    <TextLanguage textId={"button.cancel"}/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"close"} onClick={() => handleClose()}>
                        <svg width="2.125rem" height="2.125rem" viewBox="0 0 34 34" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19.3568 17.0007L24.0718 12.2873C24.2267 12.1325 24.3495 11.9486 24.4333 11.7463C24.5171 11.544 24.5603 11.3271 24.5603 11.1082C24.5603 10.8892 24.5171 10.6723 24.4333 10.47C24.3495 10.2677 24.2267 10.0838 24.0718 9.92898C23.917 9.77413 23.7331 9.6513 23.5308 9.5675C23.3285 9.48369 23.1117 9.44056 22.8927 9.44056C22.6737 9.44056 22.4568 9.48369 22.2545 9.5675C22.0522 9.6513 21.8683 9.77413 21.7135 9.92898L17.0002 14.644L12.2868 9.92898C11.9741 9.61625 11.5499 9.44056 11.1077 9.44056C10.6654 9.44056 10.2412 9.61625 9.9285 9.92898C9.61576 10.2417 9.44007 10.6659 9.44007 11.1082C9.44007 11.3271 9.4832 11.544 9.56701 11.7463C9.65081 11.9486 9.77365 12.1325 9.9285 12.2873L14.6435 17.0007L9.9285 21.714C9.61576 22.0267 9.44007 22.4509 9.44007 22.8932C9.44007 23.3354 9.61576 23.7596 9.9285 24.0723C10.2412 24.3851 10.6654 24.5607 11.1077 24.5607C11.5499 24.5607 11.9741 24.3851 12.2868 24.0723L17.0002 19.3573L21.7135 24.0723C22.0262 24.3851 22.4504 24.5607 22.8927 24.5607C23.3349 24.5607 23.7591 24.3851 24.0718 24.0723C24.3846 23.7596 24.5603 23.3354 24.5603 22.8932C24.5603 22.4509 24.3846 22.0267 24.0718 21.714L19.3568 17.0007ZM17.0002 33.6673C7.79516 33.6673 0.333496 26.2057 0.333496 17.0007C0.333496 7.79565 7.79516 0.333984 17.0002 0.333984C26.2052 0.333984 33.6668 7.79565 33.6668 17.0007C33.6668 26.2057 26.2052 33.6673 17.0002 33.6673Z"
                                fill="#8FCDCC"/>
                        </svg>
                    </div>
                </div>
            </div>
        </ParentModel>
    )
}

function GroupElementContainer({data, state, dispatch, index, handleDelete}: groupElementContainerProps) {
    const {isFold, foldClassName, changeFold} = useFold()


    return (
        <div className={"groupElementContainer"}>
            <div className={"groupElement"}>
                {state.settingMode === settingMode.edit &&
                    <div className={"deleteButtonContainer"}
                         onClick={() => handleDelete(data.groupName)}>
                        <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 0C5.3715 0 0 5.373 0 12C0 18.627 5.3715 24 12 24C18.6285 24 24 18.627 24 12C24 5.373 18.6285 0 12 0ZM17.5605 15.4395C17.8418 15.7208 17.9998 16.1022 17.9998 16.5C17.9998 16.8978 17.8418 17.2792 17.5605 17.5605C17.2792 17.8418 16.8978 17.9998 16.5 17.9998C16.1022 17.9998 15.7208 17.8418 15.4395 17.5605L12 14.121L8.5605 17.5605C8.42152 17.7003 8.25628 17.8112 8.07428 17.8869C7.89228 17.9626 7.69711 18.0016 7.5 18.0016C7.30289 18.0016 7.10772 17.9626 6.92572 17.8869C6.74372 17.8112 6.57848 17.7003 6.4395 17.5605C6.30008 17.4213 6.18948 17.256 6.11401 17.074C6.03854 16.8921 5.9997 16.697 5.9997 16.5C5.9997 16.303 6.03854 16.1079 6.11401 15.926C6.18948 15.744 6.30008 15.5787 6.4395 15.4395L9.879 12L6.4395 8.5605C6.15824 8.27924 6.00023 7.89776 6.00023 7.5C6.00023 7.10224 6.15824 6.72076 6.4395 6.4395C6.72076 6.15824 7.10224 6.00023 7.5 6.00023C7.89776 6.00023 8.27924 6.15824 8.5605 6.4395L12 9.879L15.4395 6.4395C15.7208 6.15824 16.1022 6.00023 16.5 6.00023C16.8978 6.00023 17.2792 6.15824 17.5605 6.4395C17.8418 6.72076 17.9998 7.10224 17.9998 7.5C17.9998 7.89776 17.8418 8.27924 17.5605 8.5605L14.121 12L17.5605 15.4395Z"
                                fill="#EC0000"/>
                        </svg>
                    </div>
                }
                <div className={"groupName"}>{data.groupName}</div>
                <div className={"foldButtonContainer"} onClick={() => changeFold()}>
                    <div className={foldClassName}/>
                </div>
                <div className={"updateTime"}>{data.updateTime}</div>
            </div>
            <div className={"groupFieldContainer"}>
                {!isFold && <HandleGroupData data={data.groupData} layer={0}
                                             state={state}
                                             dispatch={dispatch}/>}
            </div>
        </div>
    )
}

function MergeGroupSelect({item, index, mergeSelect, setMergeSelect, handleSelect}: mergeGroupSelectProps) {
    let isCheck = !!mergeSelect[item.groupName]
    return (
        <div className={"mergeGroupSelect"} onClick={() => handleSelect(item)}>
            <div className={isCheck ? "background2" : "background"}/>
            <input type="checkbox" checked={isCheck}
                   readOnly={true}
            />
            <div className={"groupName"}>
                {item.groupName}
            </div>
        </div>
    )
}

function HandleGroupData({data, state, layer, dispatch}: handleGroupDataProps) {
    let type
    if (Array.isArray(data)) {
        type = "array"
    } else {
        type = typeof (data)
    }

    return (
        <>
            {type === "object" && <HandleObject preData={data} state={state} layer={layer} dispatch={dispatch}/>}
            {type === "array" && <HandleAlarmAck preData={data} state={state} layer={layer} dispatch={dispatch}/>}
        </>
    )
}

function HandleObject({preData, state, layer, dispatch}: handleObjectProps) {
    const [data, setData] = useState(preData)
    const subData = []
    for (let field in data) {
        let isNumber = false
        if (typeof (data[field]) === "number") {
            isNumber = true
        }
        subData.push({
            "field": field,
            "isNumber": isNumber
        })
    }

    useEffect(() => {
        setData(preData)
    }, [preData])

    function handleClick(field: any) {
        if (state.settingMode !== settingMode.edit) {
            return
        }
        setData((pre: any) => {
            return setDataReturn(pre, field, preData)
        })
        dispatch({
            type: "settingGeneral.setIsChange",
            payload: true
        })
    }

    return (
        <>
            {subData.map((item, index) =>
                item.isNumber ? (
                    <div className={"groupField"} key={index}>
                        <div className={"block"}/>
                        <div className={"fieldName"} style={{"marginLeft": layer * 2 + "rem"}}>
                            {item.field}
                        </div>
                        <div className={"rangeContainer"} onClick={() => handleClick(item.field)}>
                            <input type="range" value={data[item.field]} min={0}
                                   max={1} className={rangeClassName(data[item.field])}
                                   readOnly={true} disabled={state.settingMode !== settingMode.edit}
                            />
                        </div>
                    </div>
                ) : (
                    <GroupField field={item.field} data={data[item.field]}
                                key={index} layer={layer} state={state}
                                dispatch={dispatch}
                    />
                )
            )}
        </>
    )
}

function GroupField({field, data, layer, state, dispatch}: groupFieldProps) {
    const {isFold, foldClassName, changeFold} = useFold()
    return (
        <>
            <div className={"groupField"}>
                <div className={"block"}/>
                <div className={"fieldName"} style={{"marginLeft": layer * 2 + "rem"}}>
                    {field}
                </div>
                <div className={"foldButtonContainer"} onClick={() => changeFold()}>
                    <div className={foldClassName}/>
                </div>
            </div>
            {!isFold && <HandleGroupData data={data} layer={layer + 1}
                                         state={state} dispatch={dispatch}/>}
        </>
    )
}

function HandleAlarmAck({preData, layer, state, dispatch}: handleAlarmAckProps) {
    const [data, setData] = useState(preData)

    function handleClick(field: any, setData: any, preData: any, data: any) {
        if (state.settingMode !== settingMode.edit) {
            return
        }
        subHandleClick(field, setData, preData, data)
        dispatch({
            type: "settingGeneral.setIsChange",
            payload: true
        })
    }

    useEffect(() => {
        setData(preData)
    }, [preData])

    return (
        <>
            {ackSchemas.map((field: any, index: number) => (
                <div className={"groupField"} key={index}>
                    <div className={"block"}/>
                    <div className={"fieldName"} style={{"marginLeft": layer * 2 + "rem"}}>
                        {field}
                    </div>
                    <div className={"rangeContainer"}
                         onClick={() => handleClick(field, setData, preData, data)}>
                        <input type="range" value={rangeArrayValue(field, data)} min={0}
                               max={1} className={rangeArrayClassName(field, data)}
                               readOnly={true} disabled={state.settingMode !== settingMode.edit}
                        />
                    </div>
                </div>
            ))}
        </>
    )
}

function HandleCreateGroupData({data, layer}: handleCreateGroupDataProps) {
    let type
    if (Array.isArray(data)) {
        type = "array"
    } else {
        type = typeof (data)
    }

    return (
        <>
            {type === "object" && <HandleCreateObject preData={data} layer={layer}/>}
            {type === "array" && <HandleCreateAlarmAck preData={data} layer={layer}/>}
        </>
    )
}

function HandleCreateObject({preData, layer}: handleCreateObjectProps) {
    //FIXME 重複需修改
    const [data, setData] = useState(preData)
    const subData = []
    for (let field in data) {
        let isNumber = false
        if (typeof (data[field]) === "number") {
            isNumber = true
        }
        subData.push({
            "field": field,
            "isNumber": isNumber
        })
    }

    function handleClick(field: any) {
        setData((pre: any) => {
            return setDataReturn(pre, field, preData)
        })
    }

    useEffect(() => {
        setData(preData)
    }, [preData])

    return (
        <>
            {subData.map((item, index) =>
                item.isNumber ? (
                    <div className={"groupField"} key={index}>
                        <div className={"block"}/>
                        <div className={"fieldName"} style={{"marginLeft": layer * 2 + "rem"}}>
                            {item.field}
                        </div>
                        <div className={"rangeContainer"} onClick={() => handleClick(item.field)}>
                            <input type="range" value={data[item.field]} min={0}
                                   max={1} className={rangeClassName(data[item.field])}
                                   readOnly={true}
                            />
                        </div>
                    </div>
                ) : (
                    <CreateGroupField field={item.field} data={preData[item.field]}
                                      key={index} layer={layer}
                    />
                )
            )}
        </>
    )
}

function CreateGroupField({field, data, layer}: createGroupFieldProps) {
    const {isFold, foldClassName, changeFold} = useFold()
    return (
        <>
            <div className={"groupField"}>
                <div className={"block"}/>
                <div className={"fieldName"} style={{"marginLeft": layer * 2 + "rem"}}>
                    {field}
                </div>
                <div className={"foldButtonContainer"} onClick={() => changeFold()}>
                    <div className={foldClassName}/>
                </div>
            </div>
            {!isFold && <HandleCreateGroupData data={data} layer={layer + 1}/>}
        </>
    )
}

function HandleCreateAlarmAck({preData, layer}: handleCreateAlarmAckProps) {
    const [data, setData] = useState(preData)
    useEffect(() => {
        setData(preData)
    }, [preData])

    return (
        <>
            {ackSchemas.map((field: any, index: number) => (
                <div className={"groupField"} key={index}>
                    <div className={"block"}/>
                    <div className={"fieldName"} style={{"marginLeft": layer * 2 + "rem"}}>
                        {field}
                    </div>
                    <div className={"rangeContainer"}
                         onClick={() => subHandleClick(field, setData, preData, data)}>
                        <input type="range" value={rangeArrayValue(field, data)} min={0}
                               max={1} className={rangeArrayClassName(field, data)}
                               readOnly={true}
                        />
                    </div>
                </div>
            ))}
        </>
    )
}

function MergeData({mergeSelect, mergeData}: mergeDataProps) {
    return (
        <div className={"mergeData"}>
            <HandleMergeData mergeSelect={mergeSelect} layer={[]}
                             mergeData={mergeData}/>
            <div className={"block"}/>
        </div>
    )
}

function HandleMergeData({mergeSelect, layer, mergeData}: handleMergeDataProps) {
    let target = mergeData
    for (let i of layer) {
        target = target[i]
    }
    let type
    if (Array.isArray(target)) {
        type = "array"
    } else {
        type = typeof (target)
    }
    return (
        <>
            {type === "object" && <HandleMergeObject mergeSelect={mergeSelect} layer={layer}
                                                     mergeData={mergeData}/>}
            {type === "array" && <HandleMergeAlarmAck mergeSelect={mergeSelect} layer={layer}
                                                      mergeData={mergeData}/>}
        </>
    )
}

function HandleMergeObject({mergeSelect, layer, mergeData}: handleMergeObjectProps) {
    const [isHover, setIsHover] = useState({
        "on": {},
        "off": {}
    })

    const {subData, targetDict, hoverList} = useMemo(() => {
        let targetDict = deepCopy(mergeData)
        for (let j of layer) {
            targetDict = targetDict[j]
        }
        let selectDict: any = {}
        for (let i in mergeSelect) {
            let subTargetDict = mergeSelect[i]
            for (let j of layer) {
                if (subTargetDict.hasOwnProperty(j)) {
                    subTargetDict = subTargetDict[j]
                    selectDict[i] = subTargetDict
                } else {
                    selectDict[i] = {}
                    break
                }
            }
        }
        const subData = []
        const hoverList: any = {"on": {}, "off": {}}
        for (let field in targetDict) {
            let isNumber = false
            hoverList.on[field] = []
            hoverList.off[field] = []
            if (typeof (targetDict[field]) === "number") {
                isNumber = true
                for (let key in selectDict) {
                    if (selectDict[key][field] > 0) {
                        hoverList.on[field].push(key)
                        // targetDict[field] = 1.0
                    } else {
                        hoverList.off[field].push(key)
                    }
                }
            }
            subData.push({
                "field": field,
                "isNumber": isNumber
            })
        }
        return {subData, targetDict, hoverList}
    }, [mergeSelect, layer, mergeData])

    useEffect(() => {
        let result: any = {}
        for (let datum of subData) {
            if (datum.isNumber) {
                result[datum.field] = false
            }
        }
        setIsHover({
            "on": deepCopy(result),
            "off": deepCopy(result)
        })
    }, [subData])

    return (
        <>
            {subData.map((item, index) =>
                item.isNumber ? (
                    <div className={"groupField"} key={index}>
                        <div className={"block2"}/>
                        <div className={"hoverContainer off"}>
                            <div className={mergeClassName("off", hoverList, item.field)}
                                 onMouseEnter={() => handleMouse(true, "off", item.field, setIsHover)}
                                 onMouseLeave={() => handleMouse(false, "off", item.field, setIsHover)}/>
                            {hoverData("off", item.field, isHover, hoverList)}
                        </div>
                        <div className={"hoverContainer on"}>
                            <div className={mergeClassName("on", hoverList, item.field)}
                                 onMouseEnter={() => handleMouse(true, "on", item.field, setIsHover)}
                                 onMouseLeave={() => handleMouse(false, "on", item.field, setIsHover)}/>
                            {hoverData("on", item.field, isHover, hoverList)}
                        </div>
                        <div className={"fieldName"} style={{"marginLeft": layer.length * 2 + "rem"}}>
                            {item.field}
                        </div>
                        <div className={"rangeContainer"}>
                            <input type="range" value={targetDict[item.field]} min={0}
                                   max={1} className={rangeClassName(targetDict[item.field])}
                                   readOnly={true} disabled={true}
                            />
                        </div>
                    </div>
                ) : (
                    <MergeGroupField mergeData={mergeData}
                                     mergeSelect={mergeSelect}
                                     key={index} layer={[...layer, item.field]}
                    />
                )
            )}
        </>
    )
}

function MergeGroupField({mergeData, mergeSelect, layer}: mergeGroupFieldProps) {
    const {isFold, foldClassName, changeFold} = useFold(false)

    return (
        <>
            <div className={"groupField"}>
                <div className={"block"}/>
                <div className={"fieldName"} style={{"marginLeft": (layer.length - 1) * 2 + "rem"}}>
                    {layer[layer.length - 1]}
                </div>
                <div className={"foldButtonContainer"} onClick={() => changeFold()}>
                    <div className={foldClassName}/>
                </div>
            </div>
            {!isFold && <HandleMergeData mergeData={mergeData} layer={layer}
                                         mergeSelect={mergeSelect}
            />}
        </>
    )
}

function HandleMergeAlarmAck({mergeSelect, layer, mergeData}: handleMergeAlarmAckProps) {
    const [isHover, setIsHover] = useState({
        "on": {},
        "off": {}
    })

    const {targetList, hoverList} = useMemo(() => {
        let targetList = deepCopy(mergeData)
        for (let j of layer) {
            targetList = targetList[j]
        }
        let selectDict: any = {}
        for (let i in mergeSelect) {
            let subTargetList = mergeSelect[i]
            for (let j of layer) {
                if (subTargetList.hasOwnProperty(j)) {
                    subTargetList = subTargetList[j]
                    selectDict[i] = subTargetList
                } else {
                    selectDict[i] = []
                    break
                }
            }
        }
        const hoverList: any = {"on": {}, "off": {}}
        for (let field of ackSchemas) {
            hoverList.on[field] = []
            hoverList.off[field] = []
            for (let key of Object.keys(selectDict)) {
                if (selectDict[key].includes(field)) {
                    hoverList.on[field].push(key)
                    // if(!targetList.includes(field)){
                    //     targetList.push(field)
                    // }
                } else {
                    hoverList.off[field].push(key)
                }
            }
        }
        return {targetList, hoverList}
    }, [mergeSelect, layer, mergeData])

    useEffect(() => {
        let result: any = {}
        for (let datum of ackSchemas) {
            result[datum] = false
        }
        setIsHover({
            "on": deepCopy(result),
            "off": deepCopy(result)
        })
    }, [])

    return (
        <>
            {ackSchemas.map((field, index) => (
                <div className={"groupField"} key={index}>
                    <div className={"block2"}/>
                    <div className={"hoverContainer off"}>
                        <div className={mergeClassName("off", hoverList, field)}
                             onMouseEnter={() => handleMouse(true, "off", field, setIsHover)}
                             onMouseLeave={() => handleMouse(false, "off", field, setIsHover)}/>
                        {hoverData("off", field, isHover, hoverList)}
                    </div>
                    <div className={"hoverContainer on"}>
                        <div className={mergeClassName("on", hoverList, field)}
                             onMouseEnter={() => handleMouse(true, "on", field, setIsHover)}
                             onMouseLeave={() => handleMouse(false, "on", field, setIsHover)}/>
                        {hoverData("on", field, isHover, hoverList)}
                    </div>
                    <div className={"fieldName"} style={{"marginLeft": layer.length * 2 + "rem"}}>
                        {field}
                    </div>
                    <div className={"rangeContainer"}>
                        <input type="range" value={rangeArrayValue(field, targetList)} min={0}
                               max={1} className={rangeArrayClassName(field, targetList)}
                               readOnly={true} disabled={true}
                        />
                    </div>
                </div>
            ))}
        </>
    )
}