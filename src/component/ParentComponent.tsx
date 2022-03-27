import {ReactNode, ReactPortal, useEffect, useState} from "react";
import {createPortal} from "react-dom";

export function ParentModel({children, rootName="model-root"}: {children: ReactNode, rootName?: string}): ReactPortal{
    const [divContainer] = useState(document.createElement("div"))

    useEffect(()=>{
        const modelRoot = document.querySelector("#"+rootName) as HTMLElement
        modelRoot!.appendChild(divContainer)
        return (): void => {modelRoot.removeChild(divContainer)}
    },[rootName, divContainer])
    return createPortal(children, divContainer)
}
