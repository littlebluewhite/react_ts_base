import {usePopupWindow3} from "../../../../Module/popupWindow/popupWindow";
import {updateConfig} from "../../../../Module/popupWindow/exampleConfig";

export function Test1(){
    const config = {
        ...updateConfig
    }

    const [component , setIsOpen]=usePopupWindow3(config)
    return (
        <div>
             <button onClick={()=>setIsOpen(true)}>儲存</button>
            {component}
        </div>
    )
}