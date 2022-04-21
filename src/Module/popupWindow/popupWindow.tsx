import './popupWindow.css'
import {popupStatus, popupWindowParams} from "./schemas"
import {ParentModel} from "../../component/parentComponent"
import {useState} from 'react'
import {TextLanguage} from '../../component/textComponent'


export function usePopupWindow(
    {config, func1 = () => {}, func2 = () => {}}: popupWindowParams) {

    const [isOpen, setIsOpen] = useState<Boolean>(false)
    const [status, setStatus] = useState<popupStatus>(popupStatus.page1)
    function handlePage1() {
        func1()
        setStatus(popupStatus.page2)
    }

    function handlePage2() {
        func2()
        setIsOpen(false)
        setStatus(popupStatus.page1)
    }

    const content1 = (
        <div className={"model"}>
            <div className="page1">
                <div className="head">
                    <TextLanguage textId={config.page1.title}/>
                </div>
                <div className="body">
                    <button onClick={()=>setIsOpen(false)}><TextLanguage textId={config.page1.button1}/></button>
                    <button onClick={() => handlePage1()}><TextLanguage textId={config.page1.button2}/></button>
                </div>
            </div>
        </div>
    )


    const content2 = (
        <div className={"model"}>
            <div className="page2">
                <div className="head">
                    <img src={config.page2.titleImage} alt=""/>
                    <TextLanguage textId={config.page2.title}/>
                </div>
                <div className="body">
                    <TextLanguage textId={config.page2.context}/>
                    <button onClick={() => handlePage2()}><TextLanguage textId={config.page2.button}/></button>
                </div>
            </div>
        </div>
    )

    const component = (isOpen &&
        <ParentModel>
            <div className='model'>
                {status === popupStatus.page1 && content1}
                {status === popupStatus.page2 && content2}
            </div>
        </ParentModel>
    )

    return {component, setIsOpen}
}

