import {iconElementProps} from "./schemas";
import {useState} from "react";
import {iconButtonConfig} from "./data";
import { TextLanguage } from "../../component/textComponent";

export function useIconButton({name, direction, clickFunction}: iconElementProps) {
    const [isHover, setIsHover] = useState<boolean>(false)
    const iconButtonData = iconButtonConfig[name]
    return (
        <div className={`svgContainer point ${name} ${direction}`}
             onClick={()=>clickFunction()}
             onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            {isHover &&
                <div className={"hoverText "+direction}>
                    <TextLanguage textId={iconButtonData["hoverLangId"]}/>
                </div>
            }
        </div>
    )
}