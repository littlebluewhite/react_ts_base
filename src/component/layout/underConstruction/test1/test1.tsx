import {usePopupWindow} from "../../../../Module/popupWindow/popupWindow";
import {popupWindowConfig} from "../../../../Module/popupWindow/exampleConfig";

export function Test1(){
    const config = {...popupWindowConfig}

    const {component , setIsOpen}=usePopupWindow(config)
    return (
        <div>
             <button onClick={()=>setIsOpen(true)}>儲存</button>
            {component}
        </div>
    )
}