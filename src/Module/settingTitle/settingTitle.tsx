import "./settingTitle.css"
import {deleteConfig, editChangePageProps, settingTitleState, settingTitlePropsType} from "./schemas";
import {useIconButton} from "./cunstomHook";
import {useNavigate} from "react-router-dom";
import React, {Dispatch} from "react";
import {settingMode} from "../../generalReducer/settingGeneral";
import { PageControl } from "../pageControl/pageControl";
import {usePopupWindow3} from "../popupWindow/popupWindow";
import {popupWindow3Config} from "../popupWindow/schemas";
import update from "immutability-helper";

//  use generalReducer "settingGeneral"
export function SettingTitle({config, state, dispatch, data}: settingTitlePropsType) {
    function handleSearch(event: React.ChangeEvent<HTMLInputElement>){
        dispatch({
            type: "settingGeneral.setSearch",
            payload: event.target.value
        })
        dispatch({
            type: "settingGeneral.setCheck",
            payload: {}
        })
    }
    function pageControlAdditionalFunc(){
        dispatch({
            type: "settingGeneral.setCheck",
            payload: {}
        })
    }
    const check = Object.keys(state.check).length !== 0
    return (
        <div className={"settingTitle"}>
            <div className={"leftContainer"}>
                {config.search &&
                    <div className={"searchDiv"}>
                        <input type="text" className={"search"} placeholder={"search"}
                               onChange={event=>handleSearch(event)} value={state.search}
                        />
                    </div>
                }
                {state.settingMode === settingMode.watch && <EditOnPage config={config.editOnPage} dispatch={dispatch}/>}
                {state.settingMode === settingMode.watch && check &&
                    <EditChangePage config={config.editChangePage} state={state}/>}
                {state.settingMode === settingMode.watch && check &&
                    <Delete config={config.delete} state={state}/>}
            </div>
            <div className={"rightContainer"}>
                {state.settingMode === settingMode.watch &&
                    <CreateChangePage config={config.createChangePage} state={state}/>}
                {state.settingMode === settingMode.watch && <CreateOnPage config={config.createOnPage} dispatch={dispatch}/>}
                {state.settingMode === settingMode.watch && <CreateFolder config={config.createFolder} dispatch={dispatch}/>}
                <JsonIn config={config.jsonIn}/>
                <JsonOut config={config.jsonOut}/>
                <CsvIn config={config.csvIn}/>
                <CsvOut config={config.csvOut}/>
                <XlsIn config={config.xlsIn}/>
                <XlsOut config={config.xlsOut}/>
                <Information config={config.information} dispatch={dispatch}/>
                {config.pageControl &&
                    <PageControl state={state} dispatch={dispatch} data={data}
                                 additionalFunc={pageControlAdditionalFunc}/>}
            </div>
        </div>
    )
}

function EditChangePage({config, state}: { config: editChangePageProps, state: any}){
    const condition = config.condition ? config.condition(state): true
    const navigate = useNavigate()
    const clickFunction = () =>{
        navigate(config.link, {state: state})
    }
    const contain = useIconButton(
        {name:"editChangePage", direction:"left", clickFunction:clickFunction})
    return (
        <>
            {config.active && condition && contain}
        </>
    )
}

function EditOnPage({config, dispatch}: { config: { active: boolean }, dispatch: Dispatch<any>}){
    const clickFunction = () =>{
        dispatch({
            type: "settingGeneral.setStatus",
            payload: settingMode.edit
        })
    }
    const contain = useIconButton(
        {name:"editOnPage", direction:"left", clickFunction:clickFunction})
    return (
        <>
            {config.active && contain}
        </>
    )
}

function Delete(
    {config, state}: { config: deleteConfig, state: settingTitleState}){
    const checkKey = (function(){
        let key = Object.keys(state.check)
        if (key.length === 1) {
            return key[0]
        } else {
            return key.length.toString()
        }
    }())
    const popupConfig = update(config.popupDeleteConfig,
        {page1: {checkKey: {$set: checkKey}, func:{$set: config.popupDeleteConfig?.page1?.func}},
        page2: {func: {$set: config.popupDeleteConfig?.page2?.func}}})

    const [component, setIsOpen] = usePopupWindow3(popupConfig as popupWindow3Config)
    function clickFunction(){
         setIsOpen(true)
    }

    const contain = useIconButton(
        {name:"delete", direction:"left", clickFunction:clickFunction})
    return (
        <>
            {config.active && contain}
            {component}
        </>
    )
}

function CreateChangePage({config, state}: { config: { active: boolean, link: string }, state:any }) {
    const navigate = useNavigate()
    const clickFunction = () =>{
        navigate(config.link, {state: state})
    }
    const contain = useIconButton(
        {name:"createChangePage", direction:"right", clickFunction:clickFunction})
    return (
        <>
            {config.active && contain}
        </>
    )
}

function CreateOnPage({config, dispatch}: { dispatch: Dispatch<any>, config: { active: boolean } }) {
    const clickFunction = () =>{
        dispatch({
            type: "settingGeneral.setStatus",
            payload: settingMode.create
        })
    }
    const contain = useIconButton(
        {name:"createOnPage", direction:"right", clickFunction:clickFunction})
    return (
        <>
            {config.active && contain}
        </>
    )
}

function CreateFolder({config, dispatch}: { dispatch: Dispatch<any>, config: { active: boolean } }) {
    const clickFunction = () =>{
        dispatch({
            type: "settingGeneral.setStatus",
            payload: settingMode.createFolder
        })
    }
    const contain = useIconButton(
        {name:"createFolder", direction:"right", clickFunction:clickFunction})
    return (
        <>
            {config.active && contain}
        </>
    )
}

function JsonIn({config}: { config: { active: boolean } }) {
    const clickFunction = () =>{
    }
    const contain = useIconButton(
        {name:"jsonIn", direction:"right", clickFunction:clickFunction})
    return (
        <>
            {config.active && contain}
        </>
    )
}

function JsonOut({config}: { config: { active: boolean } }) {
    const clickFunction = () =>{
    }
    const contain = useIconButton(
        {name:"jsonOut", direction:"right", clickFunction:clickFunction})
    return (
        <>
            {config.active && contain}
        </>
    )
}

function CsvIn({config}: { config: { active: boolean } }) {
    const clickFunction = () =>{
    }
    const contain = useIconButton(
        {name:"csvIn", direction:"right", clickFunction:clickFunction})
    return (
        <>
            {config.active && contain}
        </>
    )
}

function CsvOut({config}: { config: { active: boolean } }) {
    const clickFunction = () =>{
    }
    const contain = useIconButton(
        {name:"csvOut", direction:"right", clickFunction:clickFunction})
    return (
        <>
            {config.active && contain}
        </>
    )
}

function XlsIn({config}: { config: { active: boolean } }) {
    const clickFunction = () =>{
    }
    const contain = useIconButton(
        {name:"xlsIn", direction:"right", clickFunction:clickFunction})
    return (
        <>
            {config.active && contain}
        </>
    )
}

function XlsOut({config}: { config: { active: boolean } }) {
    const clickFunction = () =>{
    }
    const contain = useIconButton(
        {name:"xlsOut", direction:"right", clickFunction:clickFunction})
    return (
        <>
            {config.active && contain}
        </>
    )
}

function Information({config, dispatch}: { config: { active: boolean }, dispatch: Dispatch<any>}){
    const clickFunction = () => {
        dispatch({
            type: "settingGeneral.setInformationModel",
            payload: true
        })
    }
    const contain = useIconButton(
        {name:"information", direction:"right", clickFunction:clickFunction})
    return (
        <>
            {config.active && contain}
        </>
    )
}
