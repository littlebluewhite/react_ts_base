import "./settingTitle.css"
import {settingTitleType} from "./schemas";
import {useIconButton} from "./cunstomHook";
import {useNavigate} from "react-router-dom";

export function SettingTitle({config, state, dispatch}: settingTitleType) {
    return (
        <div className={"settingTitle"}>
            <div className={"leftContainer"}>
                {config.search &&
                    <div className={"searchDiv"}>
                        <input type="text" className={"search"} placeholder={"search"}/>
                    </div>
                }
                {config.editChangePage.active && <EditChangePage link={config.editChangePage.link}/>}
                {config.editOnPage.active && <div className={"svgContainer editOnPage left"}/>}
                <div className={"svgContainer delete left"}/>
            </div>
            <div className={"rightContainer"}>
                <div className={"svgContainer createChangePage right"}/>
                <div className={"svgContainer createOnPage right"}/>
                <div className={"svgContainer createFolder right"}/>
                <div className={"svgContainer jsonIn right"}/>
                <div className={"svgContainer jsonOut right"}/>
                <div className={"svgContainer csvIn right"}/>
                <div className={"svgContainer csvOut right"}/>
                <div className={"svgContainer xlsIn right"}/>
                <div className={"svgContainer xlsOut right"}/>
                <div className={"svgContainer information right"}/>
                {/*<PageControl/>*/}
            </div>
        </div>
    )
}

function EditChangePage(config: {link: string}){
    const navigate = useNavigate()
    const clickFunction = () =>{
        navigate(config.link)
    }
    const contain = useIconButton(
        {name:"editChangePage", direction:"left", clickFunction:clickFunction})
    return (
        <>
            {contain}
        </>
    )
}

function IconElement(){
    const clickFunction = () => {

    }
}

