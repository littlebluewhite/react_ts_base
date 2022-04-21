import {usePopupWindow} from "../../../../Module/popupWindow/popupWindow";
import {saveConfig} from "../../../../Module/popupWindow/exampleConfig";

export function Test1(){
    const params = {
        config: {...saveConfig},
        func1: ()=>console.log(1),
        func2: ()=>console.log(2)
    }

    const {component , setIsOpen}=usePopupWindow(params)
    return (
        <div>
             <button onClick={()=>setIsOpen(true)}>儲存</button>
            {component}
        </div>
    )
}