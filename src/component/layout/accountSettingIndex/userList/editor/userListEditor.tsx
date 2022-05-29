import {useToken} from "../../../../../generalFunction/providerHook";
import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useCallback, useState} from "react";
import update from "immutability-helper";
import {usePopupWindow3} from "../../../../../Module/popupWindow/popupWindow";
import {accessLevelSelect} from "../../../../../Module/selectModule/configLibrary";
import {selectMode} from "../../../../../Module/selectModule/schemas";
import {getSelectTextId} from "../../../../../Module/selectModule/mergeSelect";
import {TextLanguage} from "../../../../textComponent";
import {SelectModule} from "../../../../../Module/selectModule/selectModule";
import "./userListEditor.css"
import {updatePopConfig} from "./moduleConfig";
import {fetchUpdateAccount} from "./fetchFunction";
import {userListStateInit} from "../userListReducer";

export function UserListEditor(){
    const locationState = useLocation().state as typeof userListStateInit
    const informationInitial = {
        "username": "",
        "accessLevel": "0",
        "password": "",
        "checkPassword": "",
        "subCompany": "",
        "phone": "",
        "email": "",
        "address": "",
        "name": "",
        "group": ""
    }
    const token = useToken()
    const navigate = useNavigate()
    const [information, setInformation] = useState(informationInitial)
    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, title: string) => {
        setInformation(pre => ({...pre, [title]: event.target.value}))
    }, [])

    async function updateFunc1(){
        console.log(await fetchUpdateAccount(token, information))
    }

    async function updateFunc2(){
        navigate("/layout/accountSetting/userList")
    }
    const popConfig = update(updatePopConfig, {page1: {func: {$set: updateFunc1}}, page2: {func: {$set: updateFunc2}}})
    const [updateModel, setOpen] = usePopupWindow3(popConfig)

    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        setOpen(true)
    }

    const resetValue= useCallback(()=>{
        const originInformation = Object.values(locationState.check)[0]
        const updateInformation = {...originInformation, group: getSelectTextId("accessLevel_choice", originInformation.accessLevel)}
        setInformation(updateInformation)
    },[locationState])

    const selectModuleConfig = async () =>{
        return await accessLevelSelect(token, selectMode.choice)
    }

    function additionalFunc(event: React.ChangeEvent<HTMLSelectElement>){
        setInformation(
            pre=>({...pre, accessLevel: event.target.value,
                group: getSelectTextId("accessLevel_choice", event.target.value)}))
    }

    // useEffect(()=>{
    //     console.log(allSelectData)
    //     setTimeout(()=>{
    //         resetValue()
    //     }, 300)
    // },[resetValue])

    return (
        <div className={"userListCreateEditor"}>
            {updateModel}
            <form onSubmit={(event)=>(handleSubmit(event))}>
                <div className={"upContainer"}>
                    <div className={"title"}>
                        <TextLanguage textId={"model.personalSetting.profile"}/>
                    </div>
                    <div className={"informationContainer"}>
                        <div className={"leftContainer"}>
                            <div className={"item"}>
                                <div className={"name opacity-35"}>
                                    <TextLanguage textId={"model.personalSetting.username"}/>
                                </div>
                                <div className={"value checkPassword opacity-35"}>
                                    {information.username}
                                </div>
                            </div>
                            <div className={"item"}>
                                <div className={"name"}>
                                    <TextLanguage textId={"model.personalSetting.companyName"}/>*
                                </div>
                                <div className={"value"}>
                                    <input required={true} type="text" value={information.subCompany}
                                           onChange={(event) => (handleChange(event, "subCompany"))}/>
                                </div>
                            </div>
                        </div>
                        <div className={"rightContainer"}>
                        </div>
                    </div>
                    <div className={"title"}>
                        <TextLanguage textId={"model.personalSetting.information"}/>
                    </div>
                    <div className={"informationContainer"}>
                        <div className={"leftContainer"}>
                            <div className={"item"}>
                                <div className={"name"}>
                                    <TextLanguage textId={"model.personalSetting.name"}/>*
                                </div>
                                <div className={"value"}>
                                    <input required={true} type="text" value={information.name}
                                           onChange={(event) => (handleChange(event, "name"))}/>
                                </div>
                            </div>
                            <div className={"item"}>
                                <div className={"name"}>
                                    <TextLanguage textId={"model.personalSetting.phone"}/>*
                                </div>
                                <div className={"value"}>
                                    <input required={true} type="text" value={information.phone}
                                           onChange={(event) => (handleChange(event, "phone"))}/>
                                </div>
                            </div>
                        </div>
                        <div className={"rightContainer"}>
                            <div className={"item"}>
                                <div className={"name"}>
                                    <TextLanguage textId={"model.personalSetting.email"}/>*
                                </div>
                                <div className={"value"}>
                                    <input required={true} type="text" value={information.email}
                                           onChange={(event) => (handleChange(event, "email"))}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"informationContainer"}>
                        <div className={"leftContainer address"}>
                            <div className={"item"}>
                                <div className={"name"}>
                                    <TextLanguage textId={"model.personalSetting.address"}/>
                                </div>
                                <div className={"value"}>
                                    <input type="text" value={information.address}
                                           onChange={(event) => (handleChange(event, "address"))}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"title"}>
                        <TextLanguage textId={"model.personalSetting.mainAuthorization"}/>*
                    </div>
                    <div className={"informationContainer"}>
                        <div className={"leftContainer"}>
                            <div className={"item"}>
                                <div className={"name accountLevel"}>
                                    <div className={"svgContainer"}>
                                        <svg width="1.3125rem" height="1.375rem" viewBox="0 0 21 22" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M8.07692 0.5C4.92692 0.5 2.42308 2.91111 2.42308 5.94444C2.41756 6.83645 2.64103 7.71595 3.07363 8.50473C3.50623 9.29351 4.13454 9.96712 4.90269 10.4657C2.02731 11.658 0 14.416 0 17.6111H1.61538C1.61538 14.1889 4.52308 11.3889 8.07692 11.3889C11.2269 11.3889 13.7308 8.97778 13.7308 5.94444C13.7308 2.91111 11.2269 0.5 8.07692 0.5ZM8.07692 2.05556C10.3385 2.05556 12.1154 3.76667 12.1154 5.94444C12.1154 8.12222 10.3385 9.83333 8.07692 9.83333C5.81538 9.83333 4.03846 8.12222 4.03846 5.94444C4.03846 3.76667 5.81538 2.05556 8.07692 2.05556ZM12.1154 11.3889C11.2269 11.3889 10.5 12.0889 10.5 12.9444V16.3667L15.3462 21.0333C15.6692 21.3444 16.0731 21.5 16.4769 21.5C16.8808 21.5 17.2846 21.3444 17.6077 21.0333L20.5154 18.2333C20.8385 17.9222 21 17.5333 21 17.1444C21 16.7556 20.8385 16.3667 20.5154 16.0556L15.6692 11.3889H12.1154ZM12.1154 12.9444H15.0231L19.3846 17.1444L16.4769 19.9444L12.1154 15.7444V12.9444ZM13.7308 13.7222C13.5166 13.7222 13.3111 13.8042 13.1596 13.95C13.0082 14.0959 12.9231 14.2937 12.9231 14.5C12.9231 14.7063 13.0082 14.9041 13.1596 15.05C13.3111 15.1958 13.5166 15.2778 13.7308 15.2778C13.945 15.2778 14.1504 15.1958 14.3019 15.05C14.4534 14.9041 14.5385 14.7063 14.5385 14.5C14.5385 14.2937 14.4534 14.0959 14.3019 13.95C14.1504 13.8042 13.945 13.7222 13.7308 13.7222Z"
                                                fill="white"/>
                                        </svg>
                                    </div>
                                    <div className={"text"}>
                                        <TextLanguage textId={"model.personalSetting.selectLevel"}/>*
                                    </div>
                                </div>
                                <div className={"value"}>
                                    <SelectModule config={selectModuleConfig} additionalFunc={additionalFunc}
                                                  value={information.accessLevel} effectFunc={resetValue}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"downContainer"}>
                    <div className={"buttonContainer"}>
                        <Link to="/layout/accountSetting/userList">
                            <div className={"button"}>
                                <TextLanguage textId={"button.cancel"}/>
                            </div>
                        </Link>
                        <div className={"button reset"} onClick={()=>resetValue()}>
                            <TextLanguage textId={"button.reset"}/>
                        </div>
                        <button className={"button save"}>
                            <TextLanguage textId={"button.save"}/>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}