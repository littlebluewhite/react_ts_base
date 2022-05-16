import "./settingTitle.css"
import {settingTitleType} from "./schemas";
import {useIconButton} from "./cunstomHook";
import {useNavigate} from "react-router-dom";
import React, {Dispatch} from "react";
import {settingMode} from "../../generalReducer/settingGeneral";
import { PageControl } from "../pageControl/pageControl";

//  use generalReducer "settingGeneral"
export function SettingTitle({config, state, dispatch, data}: settingTitleType) {
    function handleSearch(event: React.ChangeEvent<HTMLInputElement>){
        dispatch({
            type: "settingGeneral.setSearch",
            payload: event.target.value
        })
    }
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
                {state.settingMode === settingMode.watch && <EditChangePage config={config.editChangePage}/>}
                {state.settingMode === settingMode.watch && <EditOnPage config={config.editOnPage} dispatch={dispatch}/>}
                {state.settingMode === settingMode.watch && <Delete config={config.delete} dispatch={dispatch}/>}
            </div>
            <div className={"rightContainer"}>
                {state.settingMode === settingMode.watch && <CreateChangePage config={config.createChangePage}/>}
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
                    <PageControl state={state} dispatch={dispatch} data={data}/>}
            </div>
        </div>
    )
}

function EditChangePage({config}: { config: { active: boolean, link: string } }){
    const navigate = useNavigate()
    const clickFunction = () =>{
        navigate(config.link)
    }
    const contain = useIconButton(
        {name:"editChangePage", direction:"left", clickFunction:clickFunction})
    return (
        <>
            {config.active && contain}
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

function Delete({config, dispatch}: { config: { active: boolean }, dispatch: Dispatch<any>}){
    const clickFunction = () => {
        dispatch({
            type: "settingGeneral.setDeleteModel",
            payload: true
        })
    }
    const contain = useIconButton(
        {name:"delete", direction:"left", clickFunction:clickFunction})
    return (
        <>
            {config.active && contain}
        </>
    )
}

function CreateChangePage({config}: { config: { active: boolean, link: string } }) {
    const navigate = useNavigate()
    const clickFunction = () =>{
        navigate(config.link)
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
            payload: settingMode.create
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
