import {iconElementProps} from "./schemas";
import {useState} from "react";
import {FormattedMessage} from "react-intl";
import {iconButtonConfig} from "./data";

export function useIconButton({name, direction, clickFunction}: iconElementProps) {
    const [isHover, setIsHover] = useState<boolean>(false)
    const iconButtonData = iconButtonConfig[name]
    return (
        <div className={`svgContainer point ${name} ${direction}`}
             onClick={()=>clickFunction()}
             onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            {isHover &&
                <div className={"hoverText "+direction}>
                    <FormattedMessage id={iconButtonData["hoverLangId"]}/>
                </div>
            }
        </div>
    )
}